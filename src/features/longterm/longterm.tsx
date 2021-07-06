import React, { useMemo, useState } from "react";
import { worldData, Recipe } from "../../world-data/world-data";

let _recipes: {
  byId: Record<string, { recipe: Recipe, building: string }>;
  byOutput: Record<string, string[]>;
} | undefined;
function getRecipes() {
  if (!_recipes) {
    _recipes = {
      byId: {},
      byOutput: {},
    };
    for (const building of worldData.buildingCategories.PRODUCTION) {
      for (const [idx, recipe] of worldData.buildings[building].recipes.entries()) {
        const recipeId = building + idx;
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
  const [demands, setDemands] = useState([{ material: "BSE", amount: 1 }])
  const [selectedRecipes, setSelectedRecipes] = useState(["SME6"])

  const necessary = useMemo(() => {
    const demandList = demands.map(a => a.material)
    const queue = [...demandList]
    const nextQueue: string[] = []
    const handled = new Set();
    const used: Record<string, number> = {}

    // TODO: 2 passes?  select recipes /gather build order/total demand
    while (queue.length > 0 || nextQueue.length > 0) {
      if (queue.length == 0)
        queue.push(...nextQueue.splice(0, nextQueue.length))
      const material = queue[0]
      queue.splice(0, 1)
      if (demandList.indexOf(material) == -1) {
        if (!used[material])
          used[material] = 0
        used[material] += 1
      }
      // TODO: allow used recipe to be chosen
      if (!worldData.material.producedIn[material]) {
        continue;
      }
      const producedIn = worldData.material.producedIn[material][0]
      const recipe = worldData.buildings[producedIn].recipes.filter(r => Object.keys(r.outputs).indexOf(material) != -1)[0]

      for (const input of Object.keys(recipe.inputs)) {
        if (handled.has(input))
          continue;
        handled.add(input)
        nextQueue.push(input)
      }
    }

    return used
  }, [demands])

  return (<div style={{ display: "flex", flexDirection: "column" }}>
    {Object.entries(necessary).map(([material, amount]) => <div key={material}>{amount + " " + material}</div>)}
  </div>)
}
