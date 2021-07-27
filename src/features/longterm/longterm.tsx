import React, { useMemo, useState } from "react"
import { worldData, Recipe } from "../../world-data/world-data"

let _recipes: {
  byId: Record<string, { recipe: Recipe, building: string }>;
  byOutput: Record<string, string[]>;
} | undefined
function getRecipes() {
  if (!_recipes) {
    _recipes = {
      byId: {},
      byOutput: {},
    }
    for (const building of worldData.buildingCategories.PRODUCTION) {
      for (const [idx, recipe] of worldData.buildings[building].recipes.entries()) {
        const recipeId = building + idx
        _recipes.byId[recipeId] = { recipe, building }
        for (const output of Object.keys(recipe.outputs)) {
          if (!_recipes.byOutput[output])
            _recipes.byOutput[output] = []
          _recipes.byOutput[output].push(recipeId)
        }
      }
    }
  }
  return _recipes
}

export function LongtermPlanner() {
  const recipes = getRecipes()
  // const [demands, setDemands] = useState({ BSE: 1 } as Record<string, number>)
  const [demands, setDemands] = useState({ BHP: 48, BR1: 1, CQS: 1, ENG: 1, FFC: 1, MFE: 3, RCT: 1, SCB: 1, SFE: 2, SFL: 2, SSC: 48, SSL: 1 } as Record<string, number>) // FTL ship
  // const [demands, setDemands] = useState({ BHP: 43, BRS: 1, CQT: 1, FSE: 1, SCB: 1, SSC: 40, SSL: 1 } as Record<string, number>) // STL ship
  const [userSelectedRecipes, setUserSelectedRecipes] = useState([{ id: "SME6", percentage: 1 }, { id: "PP10", percentage: 1 }])

  const necessary = useMemo(() => {
    const demandList = Object.keys(demands)
    console.log("demands", demandList)
    const queue = [...demandList]
    const nextQueue: string[] = []
    const inserted = new Set()
    const used: Record<string, number> = {}
    const resources = Object.keys(worldData.planetMaxResources)

    const selectedRecipes = userSelectedRecipes.reduce((acc, { id }) => {
      for (const output of Object.keys(recipes.byId[id].recipe.outputs))
        acc[output] = id
      return acc
    }, {} as Record<string, string>)
    const usedRecipes = new Map<string, string>()
    console.log("selectedRecipes", selectedRecipes)

    // TODO: 2 passes?  select recipes /gather build order/total demand
    while (queue.length > 0 || nextQueue.length > 0) {
      if (queue.length == 0)
        queue.push(...nextQueue.splice(0, nextQueue.length))
      const material = queue[0]
      queue.splice(0, 1)

      if (resources.indexOf(material) != -1)
        continue

      // if material is a resource, ignore it?!
      // if there is a selected recipe for it, use that
      const availableRecipes = recipes.byOutput[material]
      console.log("material", material, availableRecipes)
      if (!availableRecipes)
        continue // resources
      const selectedRecipe = availableRecipes.length <= 1 ? availableRecipes[0] : selectedRecipes[material]
      if (!selectedRecipe)
        continue // can't continue - either no recipe available or user has to select a recipe
      if (usedRecipes.has(selectedRecipe))
        continue
      selectedRecipes[material] = selectedRecipe
      usedRecipes.set(selectedRecipe, material)
      for (const input of Object.keys(recipes.byId[selectedRecipe].recipe.inputs)) {
        if (inserted.has(input))
          continue
        inserted.add(input)
        nextQueue.push(input)
      }
    }

    console.log("usedRecipes", usedRecipes)

    const buckets = []
    const bucketed = new Set<string>()
    const bucketedRecipes = new Set<string>()

    while (usedRecipes.size) {
      const current = [] as string[]
      for (const [selectedRecipe, _] of usedRecipes) {
        // if (bucketedRecipes.has(selectedRecipe))
        //   continue
        const recipe = recipes.byId[selectedRecipe].recipe
        if (Object.keys(recipe.inputs).filter(input => bucketed.has(input)).length == 0) {
          for (const output of Object.keys(recipe.outputs))
            current.push(output)
          usedRecipes.delete(selectedRecipe)
          // bucketedRecipes.add(selectedRecipe)
        }
      }
      for (const output of current)
        bucketed.add(output)
      buckets.push(current)
    }
    console.log("buckets", buckets)

    const usedBuildings: Record<string, number> = {}
    const neededAmounts = { ...demands }
    const ordered = buckets.reverse().flat()
    for (const material of ordered) {
      try {
        const needed = neededAmounts[material]
        if (needed <= 0) {
          console.warn("too much", material)
          continue // meaning we have too much
        }
        if (!selectedRecipes[material]) {
          continue
        }
        usedBuildings[recipes.byId[selectedRecipes[material]].building] = 1


        const recipe = recipes.byId[selectedRecipes[material]].recipe
        const times = needed / recipe.outputs[material]
        for (const [output, am] of Object.entries(recipe.outputs)) {
          if (!neededAmounts[output])
            neededAmounts[output] = 0
          neededAmounts[output] -= am * times
          if (output == "SI" || output == "NA")
            console.error("Adding", output, times, selectedRecipes[material], material)
        }
        for (const [input, am] of Object.entries(recipe.inputs)) {
          if (!neededAmounts[input])
            neededAmounts[input] = 0
          neededAmounts[input] += am * times
        }
        used[material] = needed
      } catch (e) {
        console.error("error for " + material, e)
        throw e
      }
    }
    for (const mat of Object.keys(neededAmounts))
      if (neededAmounts[mat] == 0)
        delete neededAmounts[mat]
    console.log("neededAmounts", neededAmounts)

    // return usedBuildings

    for (const [mat, amount] of Object.entries(neededAmounts))
      used[mat] = amount
    return used
  }, [demands])

  return (<div style={{ display: "flex", flexDirection: "column" }}>
    {Object.entries(necessary).map(([material, amount]) => <div key={material}>{amount + " " + material}</div>)}
  </div>)
}
