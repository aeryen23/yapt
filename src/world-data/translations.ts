type ReactIntlTable = Record<string, {
  id: string;
  defaultMessage: string;
}>;

function transform(messages: ReactIntlTable) {
  return Object.keys(messages).reduce((acc, key) => {
    const [mat, type] = key.split(".")
    if (!acc[mat])
      acc[mat] = { name: "", description: "" }
    if (type == "name" || type == "description")
      acc[mat][type] = messages[key].defaultMessage
    return acc
  }, {} as Record<string, { name: string, description: string }>)
}

export const materialTranslations = transform({
  "advancedBulkhead.name": {
    "id": "Material.advancedBulkhead.name",
    "defaultMessage": "Advanced Bulkhead"
  },
  "advancedBulkhead.description": {
    "id": "Material.advancedBulkhead.description",
    "defaultMessage": "Compared to its little brother, the advanced bulkhead is slightly thicker and heavier, offering greater durability."
  },
  "advancedDeckElements.name": {
    "id": "Material.advancedDeckElements.name",
    "defaultMessage": "Advanced Deck Elements"
  },
  "advancedDeckElements.description": {
    "id": "Material.advancedDeckElements.description",
    "defaultMessage": "Thick and durable, these 3D-printed floor tiles can be found in certain buildings and high-end spacecraft."
  },
  "advancedEngine.name": {
    "id": "Material.advancedEngine.name",
    "defaultMessage": "Advanced STL Engine"
  },
  "advancedEngine.description": {
    "id": "Material.advancedEngine.description",
    "defaultMessage": "An advanced-level STL engine with lots of thrust power and thus a relatively high fuel consumption."
  },
  "advancedFuelPump.name": {
    "id": "Material.advancedFuelPump.name",
    "defaultMessage": "Advanced Fuel Pump"
  },
  "advancedFuelPump.description": {
    "id": "Material.advancedFuelPump.description",
    "defaultMessage": "An advanced fuel pump used in high-thrust spacecraft engines."
  },
  "advancedFuelRod.name": {
    "id": "Material.advancedFuelRod.name",
    "defaultMessage": "Advanced Fuel Rod"
  },
  "advancedFuelRod.description": {
    "id": "Material.advancedFuelRod.description",
    "defaultMessage": "An advanced form of fuel rod that can be applied in fission reactors."
  },
  "advancedHeatShield.name": {
    "id": "Material.advancedHeatShield.name",
    "defaultMessage": "Advanced Thermal Protection Tile"
  },
  "advancedHeatShield.description": {
    "id": "Material.advancedHeatShield.description",
    "defaultMessage": "Surrounding a ship with these tiles will significantly reduce the damage it takes from extreme heat."
  },
  "advancedHighgSeats.name": {
    "id": "Material.advancedHighgSeats.name",
    "defaultMessage": "Advanced High-G Seats"
  },
  "advancedHighgSeats.description": {
    "id": "Material.advancedHighgSeats.description",
    "defaultMessage": "A set of special seats significantly increasing the maximum g-force values a ship's crew can endure."
  },
  "advancedHullPlate.name": {
    "id": "Material.advancedHullPlate.name",
    "defaultMessage": "Advanced Hull Plate"
  },
  "advancedHullPlate.description": {
    "id": "Material.advancedHullPlate.description",
    "defaultMessage": "An advanced spaceship hull plate. It will significantly reduce a ship's overall deterioration and allow it to endure very high maximum g-force values."
  },
  "advancedNozzle.name": {
    "id": "Material.advancedNozzle.name",
    "defaultMessage": "Advanced Nozzle"
  },
  "advancedNozzle.description": {
    "id": "Material.advancedNozzle.description",
    "defaultMessage": "An advanced nozzle used in medium-thrust spacecraft engines."
  },
  "advancedRadiationShielding.name": {
    "id": "Material.advancedRadiationShielding.name",
    "defaultMessage": "Advanced Anti-rad Plate"
  },
  "advancedRadiationShielding.description": {
    "id": "Material.advancedRadiationShielding.description",
    "defaultMessage": "These plates protect a ship from taking damage from typical medium-star radiation levels."
  },
  "advancedStructuralElements.name": {
    "id": "Material.advancedStructuralElements.name",
    "defaultMessage": "Advanced Structural Elements"
  },
  "advancedStructuralElements.description": {
    "id": "Material.advancedStructuralElements.description",
    "defaultMessage": "Laced with titanium, these are an even sturdier, yet much lighter version of reinforced structural elements."
  },
  "advancedThermalProtectionMaterial.name": {
    "id": "Material.advancedThermalProtectionMaterial.name",
    "defaultMessage": "Advanced Thermal Protection Material"
  },
  "advancedThermalProtectionMaterial.description": {
    "id": "Material.advancedThermalProtectionMaterial.description",
    "defaultMessage": "A borosilicate-impregnated ceramic fabric used for thermal protection against extreme heat."
  },
  "advancedWhippleShielding.name": {
    "id": "Material.advancedWhippleShielding.name",
    "defaultMessage": "Advanced Whipple Shielding"
  },
  "advancedWhippleShielding.description": {
    "id": "Material.advancedWhippleShielding.description",
    "defaultMessage": "Shielding plates that significantly reduce damage from flying through systems with a high meteoroid density."
  },
  "advancedWindow.name": {
    "id": "Material.advancedWindow.name",
    "defaultMessage": "Advanced Transparent Aperture"
  },
  "advancedWindow.description": {
    "id": "Material.advancedWindow.description",
    "defaultMessage": "Fitted with reinforced frames and nano-coated glass, these windows have very specific uses in buildings and electronics."
  },
  "aerostatFoundation.name": {
    "id": "Material.aerostatFoundation.name",
    "defaultMessage": "Aerostat Foundation"
  },
  "aerostatFoundation.description": {
    "id": "Material.aerostatFoundation.description",
    "defaultMessage": "This modular, hollow platform can be filled with a lifting gas to build the buoyant foundations for structures in the  upper atmosphere of gas giants."
  },
  "airScrubber.name": {
    "id": "Material.airScrubber.name",
    "defaultMessage": "Air Scrubber"
  },
  "airScrubber.description": {
    "id": "Material.airScrubber.description",
    "defaultMessage": "Air processing equipment that removes pollutants that are detrimental to life."
  },
  "allPurposeFodder.name": {
    "id": "Material.allPurposeFodder.name",
    "defaultMessage": "All-Purpose Fodder"
  },
  "allPurposeFodder.description": {
    "id": "Material.allPurposeFodder.description",
    "defaultMessage": "Fodder for animals of all kinds."
  },
  "aluminium.name": {
    "id": "Material.aluminium.name",
    "defaultMessage": "Aluminium"
  },
  "aluminium.description": {
    "id": "Material.aluminium.description",
    "defaultMessage": "Aluminium and its alloys have been a staple of the aerospace industry since its early days, and they are still being used in virtually every structural part of modern spaceships."
  },
  "aluminiumIronAlloy.name": {
    "id": "Material.aluminiumIronAlloy.name",
    "defaultMessage": "Ferrominium"
  },
  "aluminiumIronAlloy.description": {
    "id": "Material.aluminiumIronAlloy.description",
    "defaultMessage": "An iron-based alloy commonly used as a budget replacement for titanium, so no miracles are to be expected."
  },
  "aluminiumOre.name": {
    "id": "Material.aluminiumOre.name",
    "defaultMessage": "Aluminium Ore"
  },
  "aluminiumOre.description": {
    "id": "Material.aluminiumOre.description",
    "defaultMessage": "An ore that can be smelted down to pure aluminium, which in turn plays a vital role in ship construction."
  },
  "aluminiumTitaniumAlloy.name": {
    "id": "Material.aluminiumTitaniumAlloy.name",
    "defaultMessage": "Alpha-Stabilized Titanium"
  },
  "aluminiumTitaniumAlloy.description": {
    "id": "Material.aluminiumTitaniumAlloy.description",
    "defaultMessage": "Lightweight, flexible and durable, this namesake of Earth's titanium has become the de facto standard in space ship construction."
  },
  "ammonia.name": {
    "id": "Material.ammonia.name",
    "defaultMessage": "Ammonia"
  },
  "ammonia.description": {
    "id": "Material.ammonia.description",
    "defaultMessage": "A staple of modern fuel production, Ammonia could be synthesized from Nitrogen and Hydrogen. However, collecting it directly from the atmosphere has proven more cost-efficient."
  },
  "antennaArray.name": {
    "id": "Material.antennaArray.name",
    "defaultMessage": "Antenna Array"
  },
  "antennaArray.description": {
    "id": "Material.antennaArray.description",
    "defaultMessage": "Uses a curved surface to direct signals to a focal point for collection."
  },
  "antibacterialTreeFlowers.name": {
    "id": "Material.antibacterialTreeFlowers.name",
    "defaultMessage": "Flowery Hops"
  },
  "antibacterialTreeFlowers.description": {
    "id": "Material.antibacterialTreeFlowers.description",
    "defaultMessage": "Flowers of the plant Humulus Iupulus used in the brewing of beer and herbal medicine."
  },
  "argon.name": {
    "id": "Material.argon.name",
    "defaultMessage": "Argon"
  },
  "argon.description": {
    "id": "Material.argon.description",
    "defaultMessage": "A noble gas often used as inert atmosphere in smelting, metalworking and other applications."
  },
  "artificialSoil.name": {
    "id": "Material.artificialSoil.name",
    "defaultMessage": "Artificial Soil"
  },
  "artificialSoil.description": {
    "id": "Material.artificialSoil.description",
    "defaultMessage": "Proper soil, created in the lab."
  },
  "audioDistributionSystem.name": {
    "id": "Material.audioDistributionSystem.name",
    "defaultMessage": "Audio Distribution System"
  },
  "audioDistributionSystem.description": {
    "id": "Material.audioDistributionSystem.description",
    "defaultMessage": "Distributes audio signals within a pre-defined space."
  },
  "audioTransmitter.name": {
    "id": "Material.audioTransmitter.name",
    "defaultMessage": "Audio Transmitter"
  },
  "audioTransmitter.description": {
    "id": "Material.audioTransmitter.description",
    "defaultMessage": "Transmits audio signals between two end points."
  },
  "autoDoc.name": {
    "id": "Material.autoDoc.name",
    "defaultMessage": "Auto-Doc"
  },
  "autoDoc.description": {
    "id": "Material.autoDoc.description",
    "defaultMessage": "Scans the patient's body for injuries and treats them via chemical injections."
  },
  "automatedCoolingSystem.name": {
    "id": "Material.automatedCoolingSystem.name",
    "defaultMessage": "Automated Cooling System"
  },
  "automatedCoolingSystem.description": {
    "id": "Material.automatedCoolingSystem.description",
    "defaultMessage": "A system monitoring and controlling heat in an FTL reactor."
  },
  "bacteria.name": {
    "id": "Material.bacteria.name",
    "defaultMessage": "Helpful Bacteria"
  },
  "bacteria.description": {
    "id": "Material.bacteria.description",
    "defaultMessage": "These microscopic organisms play a role in a number of processes such as fermentation and purification."
  },
  "bandages.name": {
    "id": "Material.bandages.name",
    "defaultMessage": "Bandages"
  },
  "bandages.description": {
    "id": "Material.bandages.description",
    "defaultMessage": "Used to dress superficial injuries."
  },
  "basicAiFramework.name": {
    "id": "Material.basicAiFramework.name",
    "defaultMessage": "Basic AI Framework"
  },
  "basicAiFramework.description": {
    "id": "Material.basicAiFramework.description",
    "defaultMessage": "A collection of basic AI algorithms as a starting point for any even remotely intelligent machine."
  },
  "basicBulkhead.name": {
    "id": "Material.basicBulkhead.name",
    "defaultMessage": "Basic Bulkhead"
  },
  "basicBulkhead.description": {
    "id": "Material.basicBulkhead.description",
    "defaultMessage": "Divide ships and buildings into several rooms, increase their structural rigidity and seal off fires or breached sections in case of an accident."
  },
  "basicDeckElements.name": {
    "id": "Material.basicDeckElements.name",
    "defaultMessage": "Basic Deck Elements"
  },
  "basicDeckElements.description": {
    "id": "Material.basicDeckElements.description",
    "defaultMessage": "Durable plastic floor plating for both buildings and spaceships, easily printable in various shapes and sizes."
  },
  "basicFuelPump.name": {
    "id": "Material.basicFuelPump.name",
    "defaultMessage": "Basic Fuel Pump"
  },
  "basicFuelPump.description": {
    "id": "Material.basicFuelPump.description",
    "defaultMessage": "A standard fuel pump used in low-thrust spacecraft engines."
  },
  "basicFuelRod.name": {
    "id": "Material.basicFuelRod.name",
    "defaultMessage": "Basic Fuel Rod"
  },
  "basicFuelRod.description": {
    "id": "Material.basicFuelRod.description",
    "defaultMessage": "A tube to hold the fuel required to perform FTL jumps."
  },
  "basicHeatShield.name": {
    "id": "Material.basicHeatShield.name",
    "defaultMessage": "Basic Thermal Protection Tile"
  },
  "basicHeatShield.description": {
    "id": "Material.basicHeatShield.description",
    "defaultMessage": "Surrounding a spaceship with these tiles will reduce the damage it takes from extreme heat."
  },
  "basicHighgSeats.name": {
    "id": "Material.basicHighgSeats.name",
    "defaultMessage": "Basic High-G Seats"
  },
  "basicHighgSeats.description": {
    "id": "Material.basicHighgSeats.description",
    "defaultMessage": "A set of special seats increasing the maximum g-force values a ship's crew can endure."
  },
  "basicHullPlate.name": {
    "id": "Material.basicHullPlate.name",
    "defaultMessage": "Basic Hull Plate"
  },
  "basicHullPlate.description": {
    "id": "Material.basicHullPlate.description",
    "defaultMessage": "A basic spaceship hull plate."
  },
  "basicNozzle.name": {
    "id": "Material.basicNozzle.name",
    "defaultMessage": "Basic Nozzle"
  },
  "basicNozzle.description": {
    "id": "Material.basicNozzle.description",
    "defaultMessage": "A basic nozzle used in low-thrust spacecraft engines."
  },
  "basicRadiationShielding.name": {
    "id": "Material.basicRadiationShielding.name",
    "defaultMessage": "Basic Anti-rad Plate"
  },
  "basicRadiationShielding.description": {
    "id": "Material.basicRadiationShielding.description",
    "defaultMessage": "These plates protect a ship from taking damage from typical small-star radiation levels."
  },
  "basicStructuralElements.name": {
    "id": "Material.basicStructuralElements.name",
    "defaultMessage": "Basic Structural Elements"
  },
  "basicStructuralElements.description": {
    "id": "Material.basicStructuralElements.description",
    "defaultMessage": "General term for mid-sized structural ship and building components that are neither walls nor floors."
  },
  "basicThermalProtectionMaterial.name": {
    "id": "Material.basicThermalProtectionMaterial.name",
    "defaultMessage": "Basic Thermal Protection Material"
  },
  "basicThermalProtectionMaterial.description": {
    "id": "Material.basicThermalProtectionMaterial.description",
    "defaultMessage": "A beryllium-impregnated ceramic fabric used in heat shields of all kinds."
  },
  "basicWhippleShielding.name": {
    "id": "Material.basicWhippleShielding.name",
    "defaultMessage": "Basic Whipple Shielding"
  },
  "basicWhippleShielding.description": {
    "id": "Material.basicWhippleShielding.description",
    "defaultMessage": "Shielding plates that reduce damage from flying through systems with a high meteoroid density."
  },
  "basicWindow.name": {
    "id": "Material.basicWindow.name",
    "defaultMessage": "Basic Transparent Aperture"
  },
  "basicWindow.description": {
    "id": "Material.basicWindow.description",
    "defaultMessage": "Consisting of a metal frame, multiple layers of transparent plastic, and an emergency shutter in case the window gets compromised in non-breathable atmospheres or space."
  },
  "beryl.name": {
    "id": "Material.beryl.name",
    "defaultMessage": "Beryl Crystals"
  },
  "beryl.description": {
    "id": "Material.beryl.description",
    "defaultMessage": "Beryllium Aluminum cyclosilicates. The most well known forms are emerald and aquamarine."
  },
  "beryllium.name": {
    "id": "Material.beryllium.name",
    "defaultMessage": "Beryllium"
  },
  "beryllium.description": {
    "id": "Material.beryllium.description",
    "defaultMessage": "Its thermal conductivity and low density make it useful for space based structures and ships.  Beryllium is somewhat rare as it is fused into heavier elements inside stars."
  },
  "bioreactiveMineral.name": {
    "id": "Material.bioreactiveMineral.name",
    "defaultMessage": "Bioreactive Minerals"
  },
  "bioreactiveMineral.description": {
    "id": "Material.bioreactiveMineral.description",
    "defaultMessage": "A set of highly versatile minerals that serve as a basis for different kinds of chemical reagents."
  },
  "bleach.name": {
    "id": "Material.bleach.name",
    "defaultMessage": "Desaturation Agent"
  },
  "bleach.description": {
    "id": "Material.bleach.description",
    "defaultMessage": "Desaturation agent - or \"bleach\", as it is more commonly known - is used to eliminate the natural color, texture, and odor of raw textiles."
  },
  "blueGoldConnectors.name": {
    "id": "Material.blueGoldConnectors.name",
    "defaultMessage": "Shielded Connectors"
  },
  "blueGoldConnectors.description": {
    "id": "Material.blueGoldConnectors.description",
    "defaultMessage": "Shielded connectors help reduce the risk of signal interference."
  },
  "bodyScanner.name": {
    "id": "Material.bodyScanner.name",
    "defaultMessage": "Body Scanner"
  },
  "bodyScanner.description": {
    "id": "Material.bodyScanner.description",
    "defaultMessage": "Scans human bodies, usually to detect injuries or contraband."
  },
  "boronCrystals.name": {
    "id": "Material.boronCrystals.name",
    "defaultMessage": "Boron Crystals"
  },
  "boronCrystals.description": {
    "id": "Material.boronCrystals.description",
    "defaultMessage": "Known for its resistance to heat, boron is widely applied for thermal protection purposes."
  },
  "borosilicate.name": {
    "id": "Material.borosilicate.name",
    "defaultMessage": "Borosilicate"
  },
  "borosilicate.description": {
    "id": "Material.borosilicate.description",
    "defaultMessage": "A material highly resistent to thermal shock."
  },
  "breathableLiquid.name": {
    "id": "Material.breathableLiquid.name",
    "defaultMessage": "Breathable Liquid"
  },
  "breathableLiquid.description": {
    "id": "Material.breathableLiquid.description",
    "defaultMessage": "This oxygen-rich solution prevents lungs from collapsing under high acceleration or in high-pressure environments."
  },
  "caffeinatedBeans.name": {
    "id": "Material.caffeinatedBeans.name",
    "defaultMessage": "Caffeinated Beans"
  },
  "caffeinatedBeans.description": {
    "id": "Material.caffeinatedBeans.description",
    "defaultMessage": "Coffee plants will rise up to 20 meters in height on low-gravity planets although they are generally tricky to grow, requiring heavy rain in just the right intervals."
  },
  "calcium.name": {
    "id": "Material.calcium.name",
    "defaultMessage": "Calcium"
  },
  "calcium.description": {
    "id": "Material.calcium.description",
    "defaultMessage": "Human bones have been subjected to a host of new challenges since the space age began, making a regular calcium intake all the more important."
  },
  "caliche.name": {
    "id": "Material.caliche.name",
    "defaultMessage": "Caliche Rock"
  },
  "caliche.description": {
    "id": "Material.caliche.description",
    "defaultMessage": "Caliche is a sedimentary rock mostly mined for its iodine, a stable halogen used in contemporary lighting technology."
  },
  "capacitor.name": {
    "id": "Material.capacitor.name",
    "defaultMessage": "Electric Field Capacitor"
  },
  "capacitor.description": {
    "id": "Material.capacitor.description",
    "defaultMessage": "Capacitors are made up of two conductive plates that are close together but not in contact.  When a voltage is applied to the two plates an electrical field is formed between them."
  },
  "carbohydrateGrains.name": {
    "id": "Material.carbohydrateGrains.name",
    "defaultMessage": "High-Carb Grains"
  },
  "carbohydrateGrains.description": {
    "id": "Material.carbohydrateGrains.description",
    "defaultMessage": "A staple of human nutrition since the neolithic revolution, grains are still a versatile ingredient in the age of space exploration."
  },
  "carbohydrateMaize.name": {
    "id": "Material.carbohydrateMaize.name",
    "defaultMessage": "High-Carb Maize"
  },
  "carbohydrateMaize.description": {
    "id": "Material.carbohydrateMaize.description",
    "defaultMessage": "An essential, highly nutritional ingredient, maize is grown on farms and in greenhouse domes across the universe. Some incinerate it for its Carbon, others just want to make popcorn."
  },
  "carbon.name": {
    "id": "Material.carbon.name",
    "defaultMessage": "Carbon"
  },
  "carbon.description": {
    "id": "Material.carbon.description",
    "defaultMessage": "Basis of all life and some industries, Carbon is used in ore purification and a variety of other processes."
  },
  "ceramicFabric.name": {
    "id": "Material.ceramicFabric.name",
    "defaultMessage": "Ceramic Fabric"
  },
  "ceramicFabric.description": {
    "id": "Material.ceramicFabric.description",
    "defaultMessage": "Ceramic fabrics have proven very useful when it comes to coating spaceship hulls to protect them from extreme temperatures."
  },
  "ceramicTungstenFabric.name": {
    "id": "Material.ceramicTungstenFabric.name",
    "defaultMessage": "Ceramic-Tungsten Fabric"
  },
  "ceramicTungstenFabric.description": {
    "id": "Material.ceramicTungstenFabric.description",
    "defaultMessage": "A tungsten-infused version of ceramic fabric for those who want to go the extra mile in terms of thermal protection."
  },
  "chemicalReagents.name": {
    "id": "Material.chemicalReagents.name",
    "defaultMessage": "Chemical Reagents"
  },
  "chemicalReagents.description": {
    "id": "Material.chemicalReagents.description",
    "defaultMessage": "Used to create a variety of drugs and other chemically created products."
  },
  "chlorine.name": {
    "id": "Material.chlorine.name",
    "defaultMessage": "Chlorine"
  },
  "chlorine.description": {
    "id": "Material.chlorine.description",
    "defaultMessage": "A chemical with many stand-out properties, chlorine has various uses in the food, clothing, and construction industries."
  },
  "climateController.name": {
    "id": "Material.climateController.name",
    "defaultMessage": "Climate Controller"
  },
  "climateController.description": {
    "id": "Material.climateController.description",
    "defaultMessage": "A climate controller maintains environmental factors at a comfortable level in a ship or structure."
  },
  "combustionChamber.name": {
    "id": "Material.combustionChamber.name",
    "defaultMessage": "Combustion Chamber"
  },
  "combustionChamber.description": {
    "id": "Material.combustionChamber.description",
    "defaultMessage": "Due to the extreme temperatures reached in combustion chambers, they come with multiple layers of borosilicate coating by default."
  },
  "commandBridge1.name": {
    "id": "Material.commandBridge1.name",
    "defaultMessage": "Command Bridge MK1"
  },
  "commandBridge1.description": {
    "id": "Material.commandBridge1.description",
    "defaultMessage": "A standard command bridge ready to be implemented into pretty much any spacecraft."
  },
  "commandBridge2.name": {
    "id": "Material.commandBridge2.name",
    "defaultMessage": "Command Bridge MK2"
  },
  "commandBridge2.description": {
    "id": "Material.commandBridge2.description",
    "defaultMessage": "An advanced command bridge applied in spaceships using more complex engines and reactors."
  },
  "commandBridgeShort.name": {
    "id": "Material.commandBridgeShort.name",
    "defaultMessage": "Short-distance Command Bridge"
  },
  "commandBridgeShort.description": {
    "id": "Material.commandBridgeShort.description",
    "defaultMessage": "A command bridge module specifically designed for STL-only intra-system space flight."
  },
  "communicationSystem.name": {
    "id": "Material.communicationSystem.name",
    "defaultMessage": "Communication System"
  },
  "communicationSystem.description": {
    "id": "Material.communicationSystem.description",
    "defaultMessage": "Full communication system ready to be implemented as part of a bigger complex."
  },
  "coolingFan.name": {
    "id": "Material.coolingFan.name",
    "defaultMessage": "Active Cooling Device"
  },
  "coolingFan.description": {
    "id": "Material.coolingFan.description",
    "defaultMessage": "A fan used to actively cool equipment by moving atmospheric gases over its surfaces."
  },
  "copper.name": {
    "id": "Material.copper.name",
    "defaultMessage": "Copper"
  },
  "copper.description": {
    "id": "Material.copper.description",
    "defaultMessage": "Its high electrical and thermal conductivity as well as its resistance to deformation and corrosion make copper a versatile ingredient in various electronic components."
  },
  "copperAluminiumAlloy.name": {
    "id": "Material.copperAluminiumAlloy.name",
    "defaultMessage": "Bronze"
  },
  "copperAluminiumAlloy.description": {
    "id": "Material.copperAluminiumAlloy.description",
    "defaultMessage": "Among other things, this alloy of copper and aluminium has been found to considerably increase the efficiency of solar panels."
  },
  "copperConnectors.name": {
    "id": "Material.copperConnectors.name",
    "defaultMessage": "Budget Connectors"
  },
  "copperConnectors.description": {
    "id": "Material.copperConnectors.description",
    "defaultMessage": "Cheap but effective copper based connectors."
  },
  "copperOre.name": {
    "id": "Material.copperOre.name",
    "defaultMessage": "Copper Ore"
  },
  "copperOre.description": {
    "id": "Material.copperOre.description",
    "defaultMessage": "This ore can be smelted down to copper, a metal that is nowadays used mostly in electronic devices."
  },
  "coreModuleKit.name": {
    "id": "Material.coreModuleKit.name",
    "defaultMessage": "Core Module Kit"
  },
  "coreModuleKit.description": {
    "id": "Material.coreModuleKit.description",
    "defaultMessage": "Provides everything required to build one's first base!"
  },
  "cottonProcessed.name": {
    "id": "Material.cottonProcessed.name",
    "defaultMessage": "Cotton Fabric"
  },
  "cottonProcessed.description": {
    "id": "Material.cottonProcessed.description",
    "defaultMessage": "A cloth made from cotton used in clothing as well as in medicine as a component of bandages."
  },
  "cottonRaw.name": {
    "id": "Material.cottonRaw.name",
    "defaultMessage": "Raw Cotton Fiber"
  },
  "cottonRaw.description": {
    "id": "Material.cottonRaw.description",
    "defaultMessage": "Domed cotton fields are warm and moderately humid places, and provide the basis for all of tomorrow's fashion trends."
  },
  "crewQuarters.name": {
    "id": "Material.crewQuarters.name",
    "defaultMessage": "Crew Quarters (Large)"
  },
  "crewQuarters.description": {
    "id": "Material.crewQuarters.description",
    "defaultMessage": "A large ready-to-go unit for a full spaceship crew to live and sleep in."
  },
  "crewQuartersMed.name": {
    "id": "Material.crewQuartersMed.name",
    "defaultMessage": "Crew Quarters (Medium)"
  },
  "crewQuartersMed.description": {
    "id": "Material.crewQuartersMed.description",
    "defaultMessage": "A medium-sized ready-to-go unit for a full spaceship crew to live and sleep in."
  },
  "crewQuartersSmall.name": {
    "id": "Material.crewQuartersSmall.name",
    "defaultMessage": "Crew Quarters (Small)"
  },
  "crewQuartersSmall.description": {
    "id": "Material.crewQuartersSmall.description",
    "defaultMessage": "A small ready-to-go unit for a full spaceship crew to live and sleep in."
  },
  "crewQuartersTiny.name": {
    "id": "Material.crewQuartersTiny.name",
    "defaultMessage": "Crew Quarters (Tiny)"
  },
  "crewQuartersTiny.description": {
    "id": "Material.crewQuartersTiny.description",
    "defaultMessage": "The smallest possible crew quarters. Say goodbye to luxury!"
  },
  "crowdControlDrone.name": {
    "id": "Material.crowdControlDrone.name",
    "defaultMessage": "Crowd Control Drone"
  },
  "crowdControlDrone.description": {
    "id": "Material.crowdControlDrone.description",
    "defaultMessage": "A security drone equipped to control riots and detect contraband."
  },
  "cryoUnit.name": {
    "id": "Material.cryoUnit.name",
    "defaultMessage": "Cryogenic Unit"
  },
  "cryoUnit.description": {
    "id": "Material.cryoUnit.description",
    "defaultMessage": "The cryogenic unit safely places biological specimens in, and takes them out, of cryogenic stasis."
  },
  "cryogenicFluid.name": {
    "id": "Material.cryogenicFluid.name",
    "defaultMessage": "Cryogenic Stabilizer"
  },
  "cryogenicFluid.description": {
    "id": "Material.cryogenicFluid.description",
    "defaultMessage": "This transparent, jelly-like substance is used in cryogenic tanks, mostly on generation ships. It provides nutrients via skin contact and even mitigates the effects of high acceleration."
  },
  "dataAnalyzer.name": {
    "id": "Material.dataAnalyzer.name",
    "defaultMessage": "Data Analyzer"
  },
  "dataAnalyzer.description": {
    "id": "Material.dataAnalyzer.description",
    "defaultMessage": "The data analyzer applies artificial intelligence techniques to data in order to extract insights."
  },
  "dataVisualizer.name": {
    "id": "Material.dataVisualizer.name",
    "defaultMessage": "Data Visualizer"
  },
  "dataVisualizer.description": {
    "id": "Material.dataVisualizer.description",
    "defaultMessage": "The data visualizer creates, maps, graphs, charts and other visualizations to illustrate the insights gained from data analysis."
  },
  "decorativeElements.name": {
    "id": "Material.decorativeElements.name",
    "defaultMessage": "Decorative Elements"
  },
  "decorativeElements.description": {
    "id": "Material.decorativeElements.description",
    "defaultMessage": "A variety of oddly shaped elements designed to serve as decorations at appropriate venues."
  },
  "distributedDatabase.name": {
    "id": "Material.distributedDatabase.name",
    "defaultMessage": "Distributed Database"
  },
  "distributedDatabase.description": {
    "id": "Material.distributedDatabase.description",
    "defaultMessage": "A distributed data store. They are often used to maintain state between components of a distributed system."
  },
  "drinkingWater.name": {
    "id": "Material.drinkingWater.name",
    "defaultMessage": "Drinking Water"
  },
  "drinkingWater.description": {
    "id": "Material.drinkingWater.description",
    "defaultMessage": "Treated water that is safe for drinking, food preparation and other day to day human uses."
  },
  "droneChassis.name": {
    "id": "Material.droneChassis.name",
    "defaultMessage": "Drone Chassis"
  },
  "droneChassis.description": {
    "id": "Material.droneChassis.description",
    "defaultMessage": "The basic chassis for any kind of drone."
  },
  "droneFrame.name": {
    "id": "Material.droneFrame.name",
    "defaultMessage": "Drone Frame"
  },
  "droneFrame.description": {
    "id": "Material.droneFrame.description",
    "defaultMessage": "Every drone chassis needs a proper holding frame."
  },
  "droneOperationsUnit.name": {
    "id": "Material.droneOperationsUnit.name",
    "defaultMessage": "Drone Operations Unit"
  },
  "droneOperationsUnit.description": {
    "id": "Material.droneOperationsUnit.description",
    "defaultMessage": "Building unit set up for controlling and monitoring drone operations."
  },
  "einsteinium.name": {
    "id": "Material.einsteinium.name",
    "defaultMessage": "Einsteinium"
  },
  "einsteinium.description": {
    "id": "Material.einsteinium.description",
    "defaultMessage": "A radioactive element that did not exist naturally on Earth. The high radioactivity of some Einsteinium isotopes produces a visible glow."
  },
  "engineerClothing.name": {
    "id": "Material.engineerClothing.name",
    "defaultMessage": "Smart Space Suit"
  },
  "engineerClothing.description": {
    "id": "Material.engineerClothing.description",
    "defaultMessage": "Half clothing, half computer, this garment assists engineers in their everyday tasks."
  },
  "engineerFood.name": {
    "id": "Material.engineerFood.name",
    "defaultMessage": "Flavoured Insta-Meal"
  },
  "engineerFood.description": {
    "id": "Material.engineerFood.description",
    "defaultMessage": "This spicier version of standard-issue rations enjoys great popularity among engineers, who seem to enjoy sweating even during lunch break."
  },
  "engineerLuxuryDrink.name": {
    "id": "Material.engineerLuxuryDrink.name",
    "defaultMessage": "Einsteinium-Infused Gin"
  },
  "engineerLuxuryDrink.description": {
    "id": "Material.engineerLuxuryDrink.description",
    "defaultMessage": "Sharing a bottle of gin has become one of the most prevalent ways to unwind after a long day's work. The added Einsteinium adds a certain hallucinatory quality that is hard to say no to."
  },
  "engineerLuxuryHealth.name": {
    "id": "Material.engineerLuxuryHealth.name",
    "defaultMessage": "VitaGel"
  },
  "engineerLuxuryHealth.description": {
    "id": "Material.engineerLuxuryHealth.description",
    "defaultMessage": "This paste works wonders on sore joints. VitaGel used to be a trademarked name but was soon also used for all the copies that flooded the market."
  },
  "engineerTools.name": {
    "id": "Material.engineerTools.name",
    "defaultMessage": "Personal Data Assistant"
  },
  "engineerTools.description": {
    "id": "Material.engineerTools.description",
    "defaultMessage": "A handheld analysis tool with the ability to perform diagnostics checks and help with repairs."
  },
  "enrichedEinsteinium.name": {
    "id": "Material.enrichedEinsteinium.name",
    "defaultMessage": "Enriched Einsteinium"
  },
  "enrichedEinsteinium.description": {
    "id": "Material.enrichedEinsteinium.description",
    "defaultMessage": "Einsteinium enriched in a special chemical process for use in fission reactors."
  },
  "enrichedTechnetium.name": {
    "id": "Material.enrichedTechnetium.name",
    "defaultMessage": "Enriched Technetium"
  },
  "enrichedTechnetium.description": {
    "id": "Material.enrichedTechnetium.description",
    "defaultMessage": "While not as radioactive as other materials, an enriched form of technetium proved very useful to, among other things, power radioisotope generators."
  },
  "entertainmentDataCore.name": {
    "id": "Material.entertainmentDataCore.name",
    "defaultMessage": "Entertainment Data Core"
  },
  "entertainmentDataCore.description": {
    "id": "Material.entertainmentDataCore.description",
    "defaultMessage": "Games, movies, shows, music, and everything that you dream of."
  },
  "entertainmentUnit.name": {
    "id": "Material.entertainmentUnit.name",
    "defaultMessage": "Entertainment Unit"
  },
  "entertainmentUnit.description": {
    "id": "Material.entertainmentUnit.description",
    "defaultMessage": "A full unit of entertainment hardware and control devices."
  },
  "epoxy.name": {
    "id": "Material.epoxy.name",
    "defaultMessage": "Epoxy Resin"
  },
  "epoxy.description": {
    "id": "Material.epoxy.description",
    "defaultMessage": "A highly vicous synthetic resin which, when hardened, acts as an adhesive reinforcement in building and ship components."
  },
  "fastenerKitMedium.name": {
    "id": "Material.fastenerKitMedium.name",
    "defaultMessage": "Medium Fastener Kit"
  },
  "fastenerKitMedium.description": {
    "id": "Material.fastenerKitMedium.description",
    "defaultMessage": "A medium set of standard fasteners."
  },
  "fastenerKitSmall.name": {
    "id": "Material.fastenerKitSmall.name",
    "defaultMessage": "Small Fastener Kit"
  },
  "fastenerKitSmall.description": {
    "id": "Material.fastenerKitSmall.description",
    "defaultMessage": "A small set of standard fasteners."
  },
  "fattyNuts.name": {
    "id": "Material.fattyNuts.name",
    "defaultMessage": "Triglyceride Nuts"
  },
  "fattyNuts.description": {
    "id": "Material.fattyNuts.description",
    "defaultMessage": "Nuts provide important triglycerides, which are rich in energy. Make sure to always keep an eye on your blood fat and do not overindulge."
  },
  "fattyVegetables.name": {
    "id": "Material.fattyVegetables.name",
    "defaultMessage": "Triglyceride Fruits"
  },
  "fattyVegetables.description": {
    "id": "Material.fattyVegetables.description",
    "defaultMessage": "Similar-looking to Earth's fruits, but creamier and almost fatty-tasting, Triglyceride Fruits provide fewer health benefits, but more energy than their ancestors."
  },
  "fissionReactor.name": {
    "id": "Material.fissionReactor.name",
    "defaultMessage": "Fission Reactor"
  },
  "fissionReactor.description": {
    "id": "Material.fissionReactor.description",
    "defaultMessage": "Performs controlled nuclear fission in a chain reaction to generate large amounts of energy."
  },
  "floatingTank.name": {
    "id": "Material.floatingTank.name",
    "defaultMessage": "Floating Tank"
  },
  "floatingTank.description": {
    "id": "Material.floatingTank.description",
    "defaultMessage": "A person-sized tank to have a mind-expanding floating experience in."
  },
  "flowControl.name": {
    "id": "Material.flowControl.name",
    "defaultMessage": "Flow Control Device"
  },
  "flowControl.description": {
    "id": "Material.flowControl.description",
    "defaultMessage": "This unit controls the flow of liquids in as a complex a way as its user desires."
  },
  "fluidPiping.name": {
    "id": "Material.fluidPiping.name",
    "defaultMessage": "Fluid Piping"
  },
  "fluidPiping.description": {
    "id": "Material.fluidPiping.description",
    "defaultMessage": "This fluid piping system makes use of helium in its mantle to facilitate the discovery of leakage."
  },
  "fluorine.name": {
    "id": "Material.fluorine.name",
    "defaultMessage": "Fluorine"
  },
  "fluorine.description": {
    "id": "Material.fluorine.description",
    "defaultMessage": "The lightest halogen element and extremely reactive. Fluorine has both medical and industrial applications."
  },
  "flux.name": {
    "id": "Material.flux.name",
    "defaultMessage": "Flux"
  },
  "flux.description": {
    "id": "Material.flux.description",
    "defaultMessage": "When added to an ore refining process, this chemical allows for a more efficient separation of metals from slag, resulting in higher outputs for the same input."
  },
  "ftlFieldController.name": {
    "id": "Material.ftlFieldController.name",
    "defaultMessage": "FTL Field Controller"
  },
  "ftlFieldController.description": {
    "id": "Material.ftlFieldController.description",
    "defaultMessage": "The FTL field controller enables FTL travel by using large amounts of energy to bend spacetime around a ship."
  },
  "ftlFuel.name": {
    "id": "Material.ftlFuel.name",
    "defaultMessage": "FTL Fuel"
  },
  "ftlFuel.description": {
    "id": "Material.ftlFuel.description",
    "defaultMessage": "Used by the right drive, these small pellets emit an energy capable of warping spacetime and punching a tunnel for the ship to pass through."
  },
  "fuelSavingEngine.name": {
    "id": "Material.fuelSavingEngine.name",
    "defaultMessage": "Fuel-saving STL Engine"
  },
  "fuelSavingEngine.description": {
    "id": "Material.fuelSavingEngine.description",
    "defaultMessage": "Less powerful than a standard STL engine, but saves quite a bit of fuel at the same time."
  },
  "fullBodyInteractionDevice.name": {
    "id": "Material.fullBodyInteractionDevice.name",
    "defaultMessage": "Full-Body Interaction Device"
  },
  "fullBodyInteractionDevice.description": {
    "id": "Material.fullBodyInteractionDevice.description",
    "defaultMessage": "Essentially a high-tech overall that allows its wearer to control all kinds of software via gestures and movement."
  },
  "galerite.name": {
    "id": "Material.galerite.name",
    "defaultMessage": "Galerite Rock"
  },
  "galerite.description": {
    "id": "Material.galerite.description",
    "defaultMessage": "Although nowhere to be found in the Solar System, Galerite has brought upon a revolution in STL fuel technology shortly after its discovery in humanity's new home systems."
  },
  "gasContainer.name": {
    "id": "Material.gasContainer.name",
    "defaultMessage": "Cylindrical Gas Container"
  },
  "gasContainer.description": {
    "id": "Material.gasContainer.description",
    "defaultMessage": "Due to its shape and material, this gas tank can hold substances far above atmospheric pressure."
  },
  "gasVent.name": {
    "id": "Material.gasVent.name",
    "defaultMessage": "Gas Vent"
  },
  "gasVent.description": {
    "id": "Material.gasVent.description",
    "defaultMessage": "A controllable outlet for gases."
  },
  "glassCombustionChamber.name": {
    "id": "Material.glassCombustionChamber.name",
    "defaultMessage": "Glass Combustion Chamber"
  },
  "glassCombustionChamber.description": {
    "id": "Material.glassCombustionChamber.description",
    "defaultMessage": "As it turns out, reinforced glass can withstand quite a bit of heat."
  },
  "glassEngine.name": {
    "id": "Material.glassEngine.name",
    "defaultMessage": "Glass-based STL Engine"
  },
  "glassEngine.description": {
    "id": "Material.glassEngine.description",
    "defaultMessage": "It was quite the feat when they discovered how to make a glass-based engine. It's not very powerful, but an affordable alternative!"
  },
  "glassNozzle.name": {
    "id": "Material.glassNozzle.name",
    "defaultMessage": "Glass Nozzle"
  },
  "glassNozzle.description": {
    "id": "Material.glassNozzle.description",
    "defaultMessage": "Requires extremely careful handling, but works surprisingly well."
  },
  "gold.name": {
    "id": "Material.gold.name",
    "defaultMessage": "Gold"
  },
  "gold.description": {
    "id": "Material.gold.description",
    "defaultMessage": "Though it is still not an abundant resource, humanity has taken on a more pragmatic view of gold over the centuries, appreciating its conductivity more than its appearance."
  },
  "goldCopperAlloy.name": {
    "id": "Material.goldCopperAlloy.name",
    "defaultMessage": "Red Gold"
  },
  "goldCopperAlloy.description": {
    "id": "Material.goldCopperAlloy.description",
    "defaultMessage": "This alloy combines the excellent conductivity of both gold and copper."
  },
  "goldIronAlloy.name": {
    "id": "Material.goldIronAlloy.name",
    "defaultMessage": "Blue Gold"
  },
  "goldIronAlloy.description": {
    "id": "Material.goldIronAlloy.description",
    "defaultMessage": "An alloy of gold with Gallium or Indium."
  },
  "goldOre.name": {
    "id": "Material.goldOre.name",
    "defaultMessage": "Gold Ore"
  },
  "goldOre.description": {
    "id": "Material.goldOre.description",
    "defaultMessage": "Ever since the 20th century, hydraulic mining has been the prevalent method of recovering gold nuggets from open pits and mine shafts."
  },
  "grapes.name": {
    "id": "Material.grapes.name",
    "defaultMessage": "Wine-Quality Grapes"
  },
  "grapes.description": {
    "id": "Material.grapes.description",
    "defaultMessage": "Even though grapes have become rare in the space age, they will not die out as long as there is demand for decent wine in the universe."
  },
  "habitatUnit.name": {
    "id": "Material.habitatUnit.name",
    "defaultMessage": "Habitat Unit"
  },
  "habitatUnit.description": {
    "id": "Material.habitatUnit.description",
    "defaultMessage": "An artificial, yet natural living space."
  },
  "halite.name": {
    "id": "Material.halite.name",
    "defaultMessage": "Halite Crystals"
  },
  "halite.description": {
    "id": "Material.halite.description",
    "defaultMessage": "The natural form of rock salt, these crystals are both pretty to look at and taste good when ingested."
  },
  "handcraftWorkshopUnit.name": {
    "id": "Material.handcraftWorkshopUnit.name",
    "defaultMessage": "Handcraft Workshop Unit"
  },
  "handcraftWorkshopUnit.description": {
    "id": "Material.handcraftWorkshopUnit.description",
    "defaultMessage": "Hand-made art has become quite rare. This is where it comes to life."
  },
  "hardenedHullPlate.name": {
    "id": "Material.hardenedHullPlate.name",
    "defaultMessage": "Hardened Hull Plate"
  },
  "hardenedHullPlate.description": {
    "id": "Material.hardenedHullPlate.description",
    "defaultMessage": "A hardened spaceship hull plate. It will reduce a ship's overall deterioration and allow it to endure significantly higher maximum g-force values."
  },
  "hardenedStructuralElements.name": {
    "id": "Material.hardenedStructuralElements.name",
    "defaultMessage": "Hardened Structural Elements"
  },
  "hardenedStructuralElements.description": {
    "id": "Material.hardenedStructuralElements.description",
    "defaultMessage": "General term for metal components for ships and buildings, such as girders and beams."
  },
  "heliotropeExtract.name": {
    "id": "Material.heliotropeExtract.name",
    "defaultMessage": "Heliotrope Extract"
  },
  "heliotropeExtract.description": {
    "id": "Material.heliotropeExtract.description",
    "defaultMessage": "In high-enough concentrations, substances extracted from heliotropes were found to have a sedating effect on the human body as a whole, thereby expanding the range of endurable g-force values."
  },
  "helium.name": {
    "id": "Material.helium.name",
    "defaultMessage": "Helium"
  },
  "helium.description": {
    "id": "Material.helium.description",
    "defaultMessage": "A protective gas in welding processes and still the most common solution to make your voice sound funny."
  },
  "helium3.name": {
    "id": "Material.helium3.name",
    "defaultMessage": "Helium-3 Isotope"
  },
  "helium3.description": {
    "id": "Material.helium3.description",
    "defaultMessage": "Most commonly found on surfaces exposed to cosmic rays, helium-3 is a key component of faster-than-light fuel."
  },
  "herbs.name": {
    "id": "Material.herbs.name",
    "defaultMessage": "Spicy Herbs"
  },
  "herbs.description": {
    "id": "Material.herbs.description",
    "defaultMessage": "Spices are herbs \n low in nutritional value, but provide some health benefits. As a result, they are not a given in every ship's cafeteria, but some can be found in the med bay."
  },
  "highLoadCargoBay.name": {
    "id": "Material.highLoadCargoBay.name",
    "defaultMessage": "High-load Cargo Bay Kit"
  },
  "highLoadCargoBay.description": {
    "id": "Material.highLoadCargoBay.description",
    "defaultMessage": "Everything you need to build a high-load cargo bay. It can only hold materials relatively small in volume though."
  },
  "highPowerReactor.name": {
    "id": "Material.highPowerReactor.name",
    "defaultMessage": "High-power FTL Reactor"
  },
  "highPowerReactor.description": {
    "id": "Material.highPowerReactor.description",
    "defaultMessage": "A high-power FTL reactor that takes a relatively long time to fully charge up."
  },
  "highVolumeCargoBay.name": {
    "id": "Material.highVolumeCargoBay.name",
    "defaultMessage": "High-volume Cargo Bay Kit"
  },
  "highVolumeCargoBay.description": {
    "id": "Material.highVolumeCargoBay.description",
    "defaultMessage": "Everything you need to build a high-volume cargo bay. It can only hold relatively lightweight materials though."
  },
  "holographicDisplay.name": {
    "id": "Material.holographicDisplay.name",
    "defaultMessage": "Holographic Display"
  },
  "holographicDisplay.description": {
    "id": "Material.holographicDisplay.description",
    "defaultMessage": "The holographic display creates a three dimensional image of an object that can be seen with the naked eye."
  },
  "holographicGlasses.name": {
    "id": "Material.holographicGlasses.name",
    "defaultMessage": "Holographic Glasses"
  },
  "holographicGlasses.description": {
    "id": "Material.holographicGlasses.description",
    "defaultMessage": "High-tech glasses able to display all kinds of additional information and lifelike visuals."
  },
  "hydrocarbonPlants.name": {
    "id": "Material.hydrocarbonPlants.name",
    "defaultMessage": "Hydrocarbon Plants"
  },
  "hydrocarbonPlants.description": {
    "id": "Material.hydrocarbonPlants.description",
    "defaultMessage": "Hydrocarbon plants come in many shapes and sizes, but most of them nowadays are algae grown in massive basins for a large variety of purposes."
  },
  "hydrogen.name": {
    "id": "Material.hydrogen.name",
    "defaultMessage": "Hydrogen"
  },
  "hydrogen.description": {
    "id": "Material.hydrogen.description",
    "defaultMessage": "Number one on the periodic table, hydrogen is a vital ingredient in various chemical compounds including ship fuel."
  },
  "hyperPowerReactor.name": {
    "id": "Material.hyperPowerReactor.name",
    "defaultMessage": "Hyper-power Reactor"
  },
  "hyperPowerReactor.description": {
    "id": "Material.hyperPowerReactor.description",
    "defaultMessage": "An extremely high-power FTL reactor. Its charge-up speed had to be reduced significantly to guarantee stable results."
  },
  "hyperthrustEngine.name": {
    "id": "Material.hyperthrustEngine.name",
    "defaultMessage": "Hyperthrust STL Engine"
  },
  "hyperthrustEngine.description": {
    "id": "Material.hyperthrustEngine.description",
    "defaultMessage": "This STL engine reaches extremely high thrust powers, but also burns a lot of fuel in the process."
  },
  "hyperthrustNozzle.name": {
    "id": "Material.hyperthrustNozzle.name",
    "defaultMessage": "Hyperthrust Nozzle"
  },
  "hyperthrustNozzle.description": {
    "id": "Material.hyperthrustNozzle.description",
    "defaultMessage": "A special nozzle used in high-thrust spacecraft engines."
  },
  "indigo.name": {
    "id": "Material.indigo.name",
    "defaultMessage": "Indigo Colorant"
  },
  "indigo.description": {
    "id": "Material.indigo.description",
    "defaultMessage": "When you absolutely, positively got to color it indigo."
  },
  "informationDataCore.name": {
    "id": "Material.informationDataCore.name",
    "defaultMessage": "Information Data Core"
  },
  "informationDataCore.description": {
    "id": "Material.informationDataCore.description",
    "defaultMessage": "A whole library in one small data core."
  },
  "informationManagementSystem.name": {
    "id": "Material.informationManagementSystem.name",
    "defaultMessage": "Information Management System"
  },
  "informationManagementSystem.description": {
    "id": "Material.informationManagementSystem.description",
    "defaultMessage": "A system supporting its user in analyzing and interpreting large sets of data."
  },
  "insuFoam.name": {
    "id": "Material.insuFoam.name",
    "defaultMessage": "InsuFoam"
  },
  "insuFoam.description": {
    "id": "Material.insuFoam.description",
    "defaultMessage": "This construction foam is used to insulate buildings against the cold of planets with non-habitable mean temperatures below -25°C"
  },
  "iodine.name": {
    "id": "Material.iodine.name",
    "defaultMessage": "Iodine"
  },
  "iodine.description": {
    "id": "Material.iodine.description",
    "defaultMessage": "This stable halogen is extracted from Caliche rock and used in certain lamps that cannot be replaced by LED technology."
  },
  "iron.name": {
    "id": "Material.iron.name",
    "defaultMessage": "Iron"
  },
  "iron.description": {
    "id": "Material.iron.description",
    "defaultMessage": "One of the most abundant elements on rocky planets, iron is used in a variety of alloys as well as the construction of buildings and metal parts."
  },
  "ironOre.name": {
    "id": "Material.ironOre.name",
    "defaultMessage": "Iron Ore"
  },
  "ironOre.description": {
    "id": "Material.ironOre.description",
    "defaultMessage": "Iron ore contains iron, one of the earliest metals to be smelted down by humanity, all the way back in 2000 BC."
  },
  "ironTitaniumAlloy.name": {
    "id": "Material.ironTitaniumAlloy.name",
    "defaultMessage": "Ferro-Titanium"
  },
  "ironTitaniumAlloy.description": {
    "id": "Material.ironTitaniumAlloy.description",
    "defaultMessage": "An iron titanium alloy that can be used to influence grain sizes in steelmaking."
  },
  "kevlar.name": {
    "id": "Material.kevlar.name",
    "defaultMessage": "Kevlar Fabric"
  },
  "kevlar.description": {
    "id": "Material.kevlar.description",
    "defaultMessage": "Often spun into ropes or fabric, kevlar is used as a composite material reinforcing anything from clothing to structural building elements."
  },
  "laboratoryUnit.name": {
    "id": "Material.laboratoryUnit.name",
    "defaultMessage": "Laboratory Unit"
  },
  "laboratoryUnit.description": {
    "id": "Material.laboratoryUnit.description",
    "defaultMessage": "A ready-to-go lab that can be used as part of a larger building complex."
  },
  "largeCapacitorBank.name": {
    "id": "Material.largeCapacitorBank.name",
    "defaultMessage": "Large Capacitor Bank"
  },
  "largeCapacitorBank.description": {
    "id": "Material.largeCapacitorBank.description",
    "defaultMessage": "Stores a large amount of energy."
  },
  "largeCargoBay.name": {
    "id": "Material.largeCargoBay.name",
    "defaultMessage": "Large Cargo Bay Kit"
  },
  "largeCargoBay.description": {
    "id": "Material.largeCargoBay.description",
    "defaultMessage": "Everything you need to build a large cargo bay."
  },
  "largeDeviceCover.name": {
    "id": "Material.largeDeviceCover.name",
    "defaultMessage": "Durable Casing L"
  },
  "largeDeviceCover.description": {
    "id": "Material.largeDeviceCover.description",
    "defaultMessage": "A 3D-printed, plastic-based cover for various large electronic devices."
  },
  "largeEmitter.name": {
    "id": "Material.largeEmitter.name",
    "defaultMessage": "Large FTL Emitter"
  },
  "largeEmitter.description": {
    "id": "Material.largeEmitter.description",
    "defaultMessage": "A large FTL emitter requiring a relatively high amount of power to create an FTL field spanning a large volume."
  },
  "largeFtlTank.name": {
    "id": "Material.largeFtlTank.name",
    "defaultMessage": "Large FTL Fuel Tank Kit"
  },
  "largeFtlTank.description": {
    "id": "Material.largeFtlTank.description",
    "defaultMessage": "Everything you need to build a large FTL fuel tank."
  },
  "largePlasticsBoard.name": {
    "id": "Material.largePlasticsBoard.name",
    "defaultMessage": "Polymer Sheet Type L"
  },
  "largePlasticsBoard.description": {
    "id": "Material.largePlasticsBoard.description",
    "defaultMessage": "..."
  },
  "largeShipRepairDroneUnit.name": {
    "id": "Material.largeShipRepairDroneUnit.name",
    "defaultMessage": "Large Ship-Repair Drone Operations Unit"
  },
  "largeShipRepairDroneUnit.description": {
    "id": "Material.largeShipRepairDroneUnit.description",
    "defaultMessage": "A control unit for a large set of drones able to consistently repair any kind of damage a ship takes during space flight."
  },
  "largeStlTank.name": {
    "id": "Material.largeStlTank.name",
    "defaultMessage": "Large STL Fuel Tank Kit"
  },
  "largeStlTank.description": {
    "id": "Material.largeStlTank.description",
    "defaultMessage": "Everything you need to build a large STL fuel tank."
  },
  "laserDiode.name": {
    "id": "Material.laserDiode.name",
    "defaultMessage": "Laser Diodes"
  },
  "laserDiode.description": {
    "id": "Material.laserDiode.description",
    "defaultMessage": "Laser diodes directly convert electrical energy into light."
  },
  "lifeSupportSystem.name": {
    "id": "Material.lifeSupportSystem.name",
    "defaultMessage": "Life Support System"
  },
  "lifeSupportSystem.description": {
    "id": "Material.lifeSupportSystem.description",
    "defaultMessage": "Life support systems monitor and control the atmosphere and other environmental conditions essential to life."
  },
  "lightweightBulkhead.name": {
    "id": "Material.lightweightBulkhead.name",
    "defaultMessage": "Lightweight Bulkhead"
  },
  "lightweightBulkhead.description": {
    "id": "Material.lightweightBulkhead.description",
    "defaultMessage": "Slightly thinner, but considerably lighter wall elements offering little structural stability."
  },
  "lightweightDeckElements.name": {
    "id": "Material.lightweightDeckElements.name",
    "defaultMessage": "Lightweight Deck Elements"
  },
  "lightweightDeckElements.description": {
    "id": "Material.lightweightDeckElements.description",
    "defaultMessage": "Thin but long-lived plastic floor elements available in all shapes and sizes."
  },
  "lightweightHullPlate.name": {
    "id": "Material.lightweightHullPlate.name",
    "defaultMessage": "Lightweight Hull Plate"
  },
  "lightweightHullPlate.description": {
    "id": "Material.lightweightHullPlate.description",
    "defaultMessage": "A lightweight spaceship hull plate. It will help reduce a ship's mass, but is slightly more prone to deterioration."
  },
  "lightweightStructuralElements.name": {
    "id": "Material.lightweightStructuralElements.name",
    "defaultMessage": "Lightweight Structural Elements"
  },
  "lightweightStructuralElements.description": {
    "id": "Material.lightweightStructuralElements.description",
    "defaultMessage": "Various lightweight components used in ship and building construction. Can be upgraded to be more durable, but also heavier."
  },
  "lightweightWindow.name": {
    "id": "Material.lightweightWindow.name",
    "defaultMessage": "Lightweight Transparent Aperture"
  },
  "lightweightWindow.description": {
    "id": "Material.lightweightWindow.description",
    "defaultMessage": "Primarily meant to be used on the inside of structures, these double-layered windows find a great variety of applications both on planets and ships."
  },
  "limestone.name": {
    "id": "Material.limestone.name",
    "defaultMessage": "Limestone"
  },
  "limestone.description": {
    "id": "Material.limestone.description",
    "defaultMessage": "This Calcium-rich mineral can be found both in the crust and on the surface of many rocky planets. Its uses include construction and nutrition."
  },
  "liquidCrystals.name": {
    "id": "Material.liquidCrystals.name",
    "defaultMessage": "Liquid Crystals"
  },
  "liquidCrystals.description": {
    "id": "Material.liquidCrystals.description",
    "defaultMessage": "These crystals are used in the manufacturing of Liquid Crystal Displays, or LCDs for short."
  },
  "liquidEinsteinium.name": {
    "id": "Material.liquidEinsteinium.name",
    "defaultMessage": "Liquid Einsteinium"
  },
  "liquidEinsteinium.description": {
    "id": "Material.liquidEinsteinium.description",
    "defaultMessage": "Einstenium processed into liquid form.  Still radioactive.  Still glowing."
  },
  "lithium.name": {
    "id": "Material.lithium.name",
    "defaultMessage": "Lithium"
  },
  "lithium.description": {
    "id": "Material.lithium.description",
    "defaultMessage": "Commonly used for the production of batteries and pharmaceuticals."
  },
  "lithiumOre.name": {
    "id": "Material.lithiumOre.name",
    "defaultMessage": "Lithium Ore"
  },
  "lithiumOre.description": {
    "id": "Material.lithiumOre.description",
    "defaultMessage": "Lithium ore is required to produce lithium."
  },
  "localDatabase.name": {
    "id": "Material.localDatabase.name",
    "defaultMessage": "Local Database"
  },
  "localDatabase.description": {
    "id": "Material.localDatabase.description",
    "defaultMessage": "A local data store."
  },
  "logisticsSystem.name": {
    "id": "Material.logisticsSystem.name",
    "defaultMessage": "Logistics System"
  },
  "logisticsSystem.description": {
    "id": "Material.logisticsSystem.description",
    "defaultMessage": "A system to help with inventory management, transactions and the likes."
  },
  "lowHeatFuelPump.name": {
    "id": "Material.lowHeatFuelPump.name",
    "defaultMessage": "Low-heat Fuel Pump"
  },
  "lowHeatFuelPump.description": {
    "id": "Material.lowHeatFuelPump.description",
    "defaultMessage": "An affordable fuel pump. Should not be used as part of high-temperature engines."
  },
  "machineLearningInterface.name": {
    "id": "Material.machineLearningInterface.name",
    "defaultMessage": "Machine Learning Interface"
  },
  "machineLearningInterface.description": {
    "id": "Material.machineLearningInterface.description",
    "defaultMessage": "The first step in creating a self-learning artificial intelligence."
  },
  "magnesite.name": {
    "id": "Material.magnesite.name",
    "defaultMessage": "Magnesite"
  },
  "magnesite.description": {
    "id": "Material.magnesite.description",
    "defaultMessage": "A magnesium-rich mineral."
  },
  "magnesium.name": {
    "id": "Material.magnesium.name",
    "defaultMessage": "Magnesium"
  },
  "magnesium.description": {
    "id": "Material.magnesium.description",
    "defaultMessage": "One of the most abundant elements in the universe.  Magnesium has many applications including as a structural material, in aluminium alloys and for the purification of solvents."
  },
  "magneticFloor.name": {
    "id": "Material.magneticFloor.name",
    "defaultMessage": "Magnetic Ground Cover"
  },
  "magneticFloor.description": {
    "id": "Material.magneticFloor.description",
    "defaultMessage": "Magnetic ground cover allows you to establish a firm foundation in low gravity environments."
  },
  "magnetite.name": {
    "id": "Material.magnetite.name",
    "defaultMessage": "Magnetite"
  },
  "magnetite.description": {
    "id": "Material.magnetite.description",
    "defaultMessage": "A iron oxide and common iron ore.  Magnetite is ferromagnetic and can be magnetized."
  },
  "mainFrameBlank.name": {
    "id": "Material.mainFrameBlank.name",
    "defaultMessage": "Basic Mainframe"
  },
  "mainFrameBlank.description": {
    "id": "Material.mainFrameBlank.description",
    "defaultMessage": "The \"main frame\" held the central processing and main memory of early computers.  Today's mainframes are large centralized computing facilities often used for critical applications."
  },
  "meat.name": {
    "id": "Material.meat.name",
    "defaultMessage": "Meat Tissue Patties"
  },
  "meat.description": {
    "id": "Material.meat.description",
    "defaultMessage": "The days of industrial livestock farming have long gone by, and the term \"meat\" has since taken on another meaning merely pertaining to a meal's texture and taste."
  },
  "medicalStretcher.name": {
    "id": "Material.medicalStretcher.name",
    "defaultMessage": "Medical Stretcher"
  },
  "medicalStretcher.description": {
    "id": "Material.medicalStretcher.description",
    "defaultMessage": "The most basic form of a mobile medical bed."
  },
  "mediumCapacitorBank.name": {
    "id": "Material.mediumCapacitorBank.name",
    "defaultMessage": "Medium Capacitor Bank"
  },
  "mediumCapacitorBank.description": {
    "id": "Material.mediumCapacitorBank.description",
    "defaultMessage": "Stores a medium amount of energy."
  },
  "mediumCargoBay.name": {
    "id": "Material.mediumCargoBay.name",
    "defaultMessage": "Medium Cargo Bay Kit"
  },
  "mediumCargoBay.description": {
    "id": "Material.mediumCargoBay.description",
    "defaultMessage": "Everything you need to build a medium-sized cargo bay."
  },
  "mediumDeviceCover.name": {
    "id": "Material.mediumDeviceCover.name",
    "defaultMessage": "Durable Casing M"
  },
  "mediumDeviceCover.description": {
    "id": "Material.mediumDeviceCover.description",
    "defaultMessage": "A 3D-printed, plastic-based cover for various medium electronic devices."
  },
  "mediumEmitter.name": {
    "id": "Material.mediumEmitter.name",
    "defaultMessage": "Medium FTL Emitter"
  },
  "mediumEmitter.description": {
    "id": "Material.mediumEmitter.description",
    "defaultMessage": "A medium-size FTL emitter requiring a moderate amount of power to create an FTL field spanning a mid-sized volume."
  },
  "mediumFtlTank.name": {
    "id": "Material.mediumFtlTank.name",
    "defaultMessage": "Medium FTL Fuel Tank Kit"
  },
  "mediumFtlTank.description": {
    "id": "Material.mediumFtlTank.description",
    "defaultMessage": "Everything you need to build a medium-sized FTL fuel tank."
  },
  "mediumPlasticsBoard.name": {
    "id": "Material.mediumPlasticsBoard.name",
    "defaultMessage": "Polymer Sheet Type M"
  },
  "mediumPlasticsBoard.description": {
    "id": "Material.mediumPlasticsBoard.description",
    "defaultMessage": "..."
  },
  "mediumStlTank.name": {
    "id": "Material.mediumStlTank.name",
    "defaultMessage": "Medium STL Fuel Tank Kit"
  },
  "mediumStlTank.description": {
    "id": "Material.mediumStlTank.description",
    "defaultMessage": "Everything you need to build a medium-size STL fuel tank."
  },
  "megaTubeCoating.name": {
    "id": "Material.megaTubeCoating.name",
    "defaultMessage": "MegaTube Coating"
  },
  "megaTubeCoating.description": {
    "id": "Material.megaTubeCoating.description",
    "defaultMessage": "What makes a megatube?  Carbon nanotubes with diameters so large they are measured in micrometers."
  },
  "memoryBank.name": {
    "id": "Material.memoryBank.name",
    "defaultMessage": "Memory Bank"
  },
  "memoryBank.description": {
    "id": "Material.memoryBank.description",
    "defaultMessage": "Provides other electronic components with lightning-fast application memory."
  },
  "metalHalideLamp.name": {
    "id": "Material.metalHalideLamp.name",
    "defaultMessage": "Metal-Halide Lighting System"
  },
  "metalHalideLamp.description": {
    "id": "Material.metalHalideLamp.description",
    "defaultMessage": "These lamps have become a staple of hydroponics, allowing certain plants (especially algae) to grow without sunlight."
  },
  "microHeadphones.name": {
    "id": "Material.microHeadphones.name",
    "defaultMessage": "Micro Headphones"
  },
  "microHeadphones.description": {
    "id": "Material.microHeadphones.description",
    "defaultMessage": "Very tiny speakers. Be careful not to lose them in your ears!"
  },
  "microProcessor.name": {
    "id": "Material.microProcessor.name",
    "defaultMessage": "Micro-Processor"
  },
  "microProcessor.description": {
    "id": "Material.microProcessor.description",
    "defaultMessage": "A central processing unit implemented on a single integrated circuit."
  },
  "mineralConstructionGranulate.name": {
    "id": "Material.mineralConstructionGranulate.name",
    "defaultMessage": "Mineral Construction Granulate"
  },
  "mineralConstructionGranulate.description": {
    "id": "Material.mineralConstructionGranulate.description",
    "defaultMessage": "Melted down, molded and then cooled off, these tiny pellets provide the hardened fundament of all buildings on rocky planets."
  },
  "motherBoard.name": {
    "id": "Material.motherBoard.name",
    "defaultMessage": "Motherboard"
  },
  "motherBoard.description": {
    "id": "Material.motherBoard.description",
    "defaultMessage": "The main printed circuit board for a general purpose computer."
  },
  "mushrooms.name": {
    "id": "Material.mushrooms.name",
    "defaultMessage": "Protein-Rich Mushrooms"
  },
  "mushrooms.description": {
    "id": "Material.mushrooms.description",
    "defaultMessage": "The Agaricaceae rubicatii family of fungi is not just known for unusual cultivation methods, but also rapid growth."
  },
  "nanoCarbonSheeting.name": {
    "id": "Material.nanoCarbonSheeting.name",
    "defaultMessage": "Nano-Carbon Sheeting"
  },
  "nanoCarbonSheeting.description": {
    "id": "Material.nanoCarbonSheeting.description",
    "defaultMessage": "A substrate is covered with carbon nanotubes then the nanotubes are covered by a layer of aerogel.  The aerogel is pulled away taking the nanotubes with it to form a sheeting."
  },
  "nanoFiber.name": {
    "id": "Material.nanoFiber.name",
    "defaultMessage": "Nano Fiber"
  },
  "nanoFiber.description": {
    "id": "Material.nanoFiber.description",
    "defaultMessage": "Fibers with diameters in the nanometer size range.  In this case silicon fibers with graphene coating."
  },
  "nanoGlass.name": {
    "id": "Material.nanoGlass.name",
    "defaultMessage": "Nano-Coated Glass"
  },
  "nanoGlass.description": {
    "id": "Material.nanoGlass.description",
    "defaultMessage": "Glass with coatings of nanomaterials to give it hydrophobic, oleophobic and other properties."
  },
  "nanoResin.name": {
    "id": "Material.nanoResin.name",
    "defaultMessage": "Nano-Enhanced Resin"
  },
  "nanoResin.description": {
    "id": "Material.nanoResin.description",
    "defaultMessage": "A nanoparticle enhanced resin for industrial applications."
  },
  "navigation1.name": {
    "id": "Material.navigation1.name",
    "defaultMessage": "Navigation Module MK1"
  },
  "navigation1.description": {
    "id": "Material.navigation1.description",
    "defaultMessage": "A basic navigation module to control ships with simple engines."
  },
  "navigation2.name": {
    "id": "Material.navigation2.name",
    "defaultMessage": "Navigation Module MK2"
  },
  "navigation2.description": {
    "id": "Material.navigation2.description",
    "defaultMessage": "An advanced navigation module to control ships with complex engines."
  },
  "neon.name": {
    "id": "Material.neon.name",
    "defaultMessage": "Neon"
  },
  "neon.description": {
    "id": "Material.neon.description",
    "defaultMessage": "A colorless odorless noble gas. Neon produces a reddish orange glow when placed in an electric field."
  },
  "neonLightingSystem.name": {
    "id": "Material.neonLightingSystem.name",
    "defaultMessage": "Neon Lighting System"
  },
  "neonLightingSystem.description": {
    "id": "Material.neonLightingSystem.description",
    "defaultMessage": "Neon lights remind us of a world less complicated. They're also fun!"
  },
  "networkingFramework.name": {
    "id": "Material.networkingFramework.name",
    "defaultMessage": "Networking Framework"
  },
  "networkingFramework.description": {
    "id": "Material.networkingFramework.description",
    "defaultMessage": "Software for building networking applications."
  },
  "neuralNetwork.name": {
    "id": "Material.neuralNetwork.name",
    "defaultMessage": "Neural Network"
  },
  "neuralNetwork.description": {
    "id": "Material.neuralNetwork.description",
    "defaultMessage": "Allows for artificial learning on large sets of data by vaguely simulating how actual brain neurons work."
  },
  "nitrogen.name": {
    "id": "Material.nitrogen.name",
    "defaultMessage": "Nitrogen"
  },
  "nitrogen.description": {
    "id": "Material.nitrogen.description",
    "defaultMessage": "Traded as a gas or a liquid, Nitrogen forms a great variety of compounds and plays a role in food preservation."
  },
  "nonVolatileMemory.name": {
    "id": "Material.nonVolatileMemory.name",
    "defaultMessage": "Non-Volatile Memory"
  },
  "nonVolatileMemory.description": {
    "id": "Material.nonVolatileMemory.description",
    "defaultMessage": "Computer memory that can retrieve information after being powered on and off."
  },
  "nutrientSolution.name": {
    "id": "Material.nutrientSolution.name",
    "defaultMessage": "Nutrient Solution"
  },
  "nutrientSolution.description": {
    "id": "Material.nutrientSolution.description",
    "defaultMessage": "While nutrient solution should not be consumed on its own due to its high concentration, it is used in a great many recipes for both edible and inedble end products."
  },
  "nylon.name": {
    "id": "Material.nylon.name",
    "defaultMessage": "Nylon Fabric"
  },
  "nylon.description": {
    "id": "Material.nylon.description",
    "defaultMessage": "A versatile, plastic-based fabric traditionally used in clothing and warfare, which now also plays a role in building construction."
  },
  "officeSupplies.name": {
    "id": "Material.officeSupplies.name",
    "defaultMessage": "Office Supplies"
  },
  "officeSupplies.description": {
    "id": "Material.officeSupplies.description",
    "defaultMessage": "No one knows exactly what they are, but yet they are constantly consumed for “work”."
  },
  "olfactorySubstances.name": {
    "id": "Material.olfactorySubstances.name",
    "defaultMessage": "Olfactory Substances"
  },
  "olfactorySubstances.description": {
    "id": "Material.olfactorySubstances.description",
    "defaultMessage": "Smells nice in here!"
  },
  "operatingSystem.name": {
    "id": "Material.operatingSystem.name",
    "defaultMessage": "Operating System"
  },
  "operatingSystem.description": {
    "id": "Material.operatingSystem.description",
    "defaultMessage": "Software that provides common services and interfaces to a computer system's hardware resources for other applications."
  },
  "oxygen.name": {
    "id": "Material.oxygen.name",
    "defaultMessage": "Oxygen"
  },
  "oxygen.description": {
    "id": "Material.oxygen.description",
    "defaultMessage": "From alloy production to our own lungs, oxygen is what keeps humanity going. Warning: Higher concentrations only breathable in low gravity environments."
  },
  "painkillers.name": {
    "id": "Material.painkillers.name",
    "defaultMessage": "Painkillers"
  },
  "painkillers.description": {
    "id": "Material.painkillers.description",
    "defaultMessage": "The most popular medical drug in the universe."
  },
  "pesticides.name": {
    "id": "Material.pesticides.name",
    "defaultMessage": "DDT Plant Agent"
  },
  "pesticides.description": {
    "id": "Material.pesticides.description",
    "defaultMessage": "Although toxic to small organisms, this pesticide is safe for human consumption in moderate doses."
  },
  "pineberries.name": {
    "id": "Material.pineberries.name",
    "defaultMessage": "Pineberries"
  },
  "pineberries.description": {
    "id": "Material.pineberries.description",
    "defaultMessage": "Looks like a white strawberry, tastes like pineapple, is highly nutritious!"
  },
  "pioneerClothing.name": {
    "id": "Material.pioneerClothing.name",
    "defaultMessage": "Basic Overalls"
  },
  "pioneerClothing.description": {
    "id": "Material.pioneerClothing.description",
    "defaultMessage": "This full-body suit, usually worn as an extra layer on top of personal clothing, is certainly nothing fancy, but practical and durable."
  },
  "pioneerLuxuryClothing.name": {
    "id": "Material.pioneerLuxuryClothing.name",
    "defaultMessage": "Padded Work Overall"
  },
  "pioneerLuxuryClothing.description": {
    "id": "Material.pioneerLuxuryClothing.description",
    "defaultMessage": "This garment may not look like much, but its added plastic pads prevent countless injuries across the universe day after day."
  },
  "pioneerLuxuryDrink.name": {
    "id": "Material.pioneerLuxuryDrink.name",
    "defaultMessage": "Caffeinated Infusion"
  },
  "pioneerLuxuryDrink.description": {
    "id": "Material.pioneerLuxuryDrink.description",
    "defaultMessage": "Some take their psychoactive drugs with soy milk, others prefer them pure."
  },
  "polyEthylene.name": {
    "id": "Material.polyEthylene.name",
    "defaultMessage": "Poly-Ethylene"
  },
  "polyEthylene.description": {
    "id": "Material.polyEthylene.description",
    "defaultMessage": "The most commonly used plastic for the past few centuries, PE still plays a vital role in packaging, clothing, printed building parts, and electronics."
  },
  "polymerGranulate.name": {
    "id": "Material.polymerGranulate.name",
    "defaultMessage": "Polymer Granulate"
  },
  "polymerGranulate.description": {
    "id": "Material.polymerGranulate.description",
    "defaultMessage": "Whoever thinks they can be anything when they grow up hasn't seen polymer granulate, a supplier of plastic in virtually every industrial branch out there."
  },
  "powerCell.name": {
    "id": "Material.powerCell.name",
    "defaultMessage": "Power Cell"
  },
  "powerCell.description": {
    "id": "Material.powerCell.description",
    "defaultMessage": "A high-energy mobile power source."
  },
  "premiumFertilizer.name": {
    "id": "Material.premiumFertilizer.name",
    "defaultMessage": "Premium Fertilizer"
  },
  "premiumFertilizer.description": {
    "id": "Material.premiumFertilizer.description",
    "defaultMessage": "Surprisingly effective at generating a seemingly natural flora."
  },
  "pressureShielding.name": {
    "id": "Material.pressureShielding.name",
    "defaultMessage": "Pressure Shielding"
  },
  "pressureShielding.description": {
    "id": "Material.pressureShielding.description",
    "defaultMessage": "Shielding to protect crew and cargo from high pressure environments."
  },
  "printedCircuitBoard.name": {
    "id": "Material.printedCircuitBoard.name",
    "defaultMessage": "Printed Circuit Board"
  },
  "printedCircuitBoard.description": {
    "id": "Material.printedCircuitBoard.description",
    "defaultMessage": "A sheet of non-conductive substrate covered with a layer of conductor which electronic circuits are etched onto."
  },
  "proteinAlgae.name": {
    "id": "Material.proteinAlgae.name",
    "defaultMessage": "Protein-Rich Algae"
  },
  "proteinAlgae.description": {
    "id": "Material.proteinAlgae.description",
    "defaultMessage": "Humanity needed an efficient source of protein and came up with this strain of algae. What's more, it can even grow in space."
  },
  "proteinBeans.name": {
    "id": "Material.proteinBeans.name",
    "defaultMessage": "Protein-Rich Beans"
  },
  "proteinBeans.description": {
    "id": "Material.proteinBeans.description",
    "defaultMessage": "While still inefficient in hydroponics, beans are a staple of planet-side farming and essential provider of protein across the universe."
  },
  "proteinPaste.name": {
    "id": "Material.proteinPaste.name",
    "defaultMessage": "Protein Paste"
  },
  "proteinPaste.description": {
    "id": "Material.proteinPaste.description",
    "defaultMessage": "A goop of ground plants, this paste is an essential ingredient in modern \"meat\". Not at all enjoyable on its own."
  },
  "quickChargeReactor.name": {
    "id": "Material.quickChargeReactor.name",
    "defaultMessage": "Quick-charge FTL Reactor"
  },
  "quickChargeReactor.description": {
    "id": "Material.quickChargeReactor.description",
    "defaultMessage": "A moderate-power reactor able to charge up very quickly."
  },
  "radiationShielding.name": {
    "id": "Material.radiationShielding.name",
    "defaultMessage": "Radiation Shielding"
  },
  "radiationShielding.description": {
    "id": "Material.radiationShielding.description",
    "defaultMessage": "Shielding to protect crew and cargo from radiation environments."
  },
  "radioDevice.name": {
    "id": "Material.radioDevice.name",
    "defaultMessage": "Radio Device"
  },
  "radioDevice.description": {
    "id": "Material.radioDevice.description",
    "defaultMessage": "When your regular mobile phone just isn't enough!"
  },
  "radioisotopeGenerator.name": {
    "id": "Material.radioisotopeGenerator.name",
    "defaultMessage": "Radioisotope Generator"
  },
  "radioisotopeGenerator.description": {
    "id": "Material.radioisotopeGenerator.description",
    "defaultMessage": "Converts the heat from radioactive decay into a medium amount of energy."
  },
  "rations.name": {
    "id": "Material.rations.name",
    "defaultMessage": "Basic Rations"
  },
  "rations.description": {
    "id": "Material.rations.description",
    "defaultMessage": "As the most common menu item in the universe, this plant-based and often brick-shaped meal has high nutritional value to make up for the lack of flavor and spices."
  },
  "reactorControlSystem.name": {
    "id": "Material.reactorControlSystem.name",
    "defaultMessage": "Reactor Control System"
  },
  "reactorControlSystem.description": {
    "id": "Material.reactorControlSystem.description",
    "defaultMessage": "Monitors a variety of performance factors of an FTL reactor and automatically makes adjustments where necessary."
  },
  "redGoldConnectors.name": {
    "id": "Material.redGoldConnectors.name",
    "defaultMessage": "High-Capacity Connectors"
  },
  "redGoldConnectors.description": {
    "id": "Material.redGoldConnectors.description",
    "defaultMessage": "High throughput connectors for specialized applications."
  },
  "reinforcedBulkhead.name": {
    "id": "Material.reinforcedBulkhead.name",
    "defaultMessage": "Reinforced Bulkhead"
  },
  "reinforcedBulkhead.description": {
    "id": "Material.reinforcedBulkhead.description",
    "defaultMessage": "A wall element offering greater durability due to the addition of titanium and hardened epoxy resin."
  },
  "reinforcedDeckElements.name": {
    "id": "Material.reinforcedDeckElements.name",
    "defaultMessage": "Reinforced Deck Elements"
  },
  "reinforcedDeckElements.description": {
    "id": "Material.reinforcedDeckElements.description",
    "defaultMessage": "Considerably heavier than the basic and advanced versions, these floor tiles are required in some large spacecraft and planetary structures."
  },
  "reinforcedHullPlate.name": {
    "id": "Material.reinforcedHullPlate.name",
    "defaultMessage": "Reinforced Hull Plate"
  },
  "reinforcedHullPlate.description": {
    "id": "Material.reinforcedHullPlate.description",
    "defaultMessage": "A reinforced spaceship hull plate. It will slightly reduce a ship's overall deterioration and allow it to endure higher maximum g-force values."
  },
  "reinforcedStructuralElements.name": {
    "id": "Material.reinforcedStructuralElements.name",
    "defaultMessage": "Reinforced Structural Elements"
  },
  "reinforcedStructuralElements.description": {
    "id": "Material.reinforcedStructuralElements.description",
    "defaultMessage": "Laced with steel and resin, these components are used in buildings and spacecraft with increased requirements on structural integrity."
  },
  "reinforcedTranslucentMaterial.name": {
    "id": "Material.reinforcedTranslucentMaterial.name",
    "defaultMessage": "Reinforced Glass"
  },
  "reinforcedTranslucentMaterial.description": {
    "id": "Material.reinforcedTranslucentMaterial.description",
    "defaultMessage": "This hybrid of old-fashioned glass and its plastic-based counterpart can be used for windows and screens alike."
  },
  "reinforcedWindow.name": {
    "id": "Material.reinforcedWindow.name",
    "defaultMessage": "Reinforced Transparent Aperture"
  },
  "reinforcedWindow.description": {
    "id": "Material.reinforcedWindow.description",
    "defaultMessage": "Much thicker and sturdier due to the mixture of silicon- and plastic-based glass, these windows can be built to larger dimensions while still being able to withstand huge forces."
  },
  "rescueDrone.name": {
    "id": "Material.rescueDrone.name",
    "defaultMessage": "Rescue Drone"
  },
  "rescueDrone.description": {
    "id": "Material.rescueDrone.description",
    "defaultMessage": "A drone designed to locate and rescue living beings. Yes, it can actually carry a person."
  },
  "safetyUniform.name": {
    "id": "Material.safetyUniform.name",
    "defaultMessage": "Safety Uniform"
  },
  "safetyUniform.description": {
    "id": "Material.safetyUniform.description",
    "defaultMessage": "A carbon-infused overall."
  },
  "scientistClothing.name": {
    "id": "Material.scientistClothing.name",
    "defaultMessage": "AI-Assisted Lab Coat"
  },
  "scientistClothing.description": {
    "id": "Material.scientistClothing.description",
    "defaultMessage": "This coat comes with its own holographic display to assists its wearer throughout complex procedures, and even performs life-sustaining measures if an experiment goes awry."
  },
  "scientistFood.name": {
    "id": "Material.scientistFood.name",
    "defaultMessage": "Quality Meat Meal"
  },
  "scientistFood.description": {
    "id": "Material.scientistFood.description",
    "defaultMessage": "Even high-quality foods nowadays do not vary much in ingredients, but at least they are presented in different shapes and sizes."
  },
  "scientistLuxuryDrink.name": {
    "id": "Material.scientistLuxuryDrink.name",
    "defaultMessage": "Smart Zinfandel"
  },
  "scientistLuxuryDrink.description": {
    "id": "Material.scientistLuxuryDrink.description",
    "defaultMessage": "Ever since ancient Greece, great minds have relied on this liquid to think. In the space-age they even apply artificial intelligence to create this unique flavour."
  },
  "scientistLuxuryHealth.name": {
    "id": "Material.scientistLuxuryHealth.name",
    "defaultMessage": "NeuroStimulants"
  },
  "scientistLuxuryHealth.description": {
    "id": "Material.scientistLuxuryHealth.description",
    "defaultMessage": "Just a little something to perk you up."
  },
  "scientistTools.name": {
    "id": "Material.scientistTools.name",
    "defaultMessage": "Scientific Work Station"
  },
  "scientistTools.description": {
    "id": "Material.scientistTools.description",
    "defaultMessage": "A versatile computer for various purposes, but mostly used in scientific contexts."
  },
  "sealant.name": {
    "id": "Material.sealant.name",
    "defaultMessage": "Poly-Sulfite Sealant"
  },
  "sealant.description": {
    "id": "Material.sealant.description",
    "defaultMessage": "Liquid polymer providing good adherence to many common materials and flexibility when cured. May not be suitable for use on some plastics."
  },
  "searchAlgorithm.name": {
    "id": "Material.searchAlgorithm.name",
    "defaultMessage": "Search Algorithm"
  },
  "searchAlgorithm.description": {
    "id": "Material.searchAlgorithm.description",
    "defaultMessage": "An algorithm for searching through data."
  },
  "sedativeSubstance.name": {
    "id": "Material.sedativeSubstance.name",
    "defaultMessage": "Sedative Substance"
  },
  "sedativeSubstance.description": {
    "id": "Material.sedativeSubstance.description",
    "defaultMessage": "A substance directly infused into the human body via special high-g seats. It helps endure particularly high g-force levels."
  },
  "sensor.name": {
    "id": "Material.sensor.name",
    "defaultMessage": "Sensor"
  },
  "sensor.description": {
    "id": "Material.sensor.description",
    "defaultMessage": "A device that measures physical properties such as a thermistor for temperature measurements or a charge coupled device for measuring light levels."
  },
  "sensorArray.name": {
    "id": "Material.sensorArray.name",
    "defaultMessage": "Sensor Array"
  },
  "sensorArray.description": {
    "id": "Material.sensorArray.description",
    "defaultMessage": "A full suite of active and passive remote sensing systems."
  },
  "settlerClothing.name": {
    "id": "Material.settlerClothing.name",
    "defaultMessage": "Exoskeleton Work Suit"
  },
  "settlerClothing.description": {
    "id": "Material.settlerClothing.description",
    "defaultMessage": "Equipping its wearer with superhuman strength, this suit has become a staple of physical work regardless of local gravity."
  },
  "settlerLuxuryDrink.name": {
    "id": "Material.settlerLuxuryDrink.name",
    "defaultMessage": "Kombucha"
  },
  "settlerLuxuryDrink.description": {
    "id": "Material.settlerLuxuryDrink.description",
    "defaultMessage": "While Kombucha is not a necessity for survival, it provides a considerable boost to health and morale."
  },
  "settlerLuxuryTools.name": {
    "id": "Material.settlerLuxuryTools.name",
    "defaultMessage": "Repair Kit"
  },
  "settlerLuxuryTools.description": {
    "id": "Material.settlerLuxuryTools.description",
    "defaultMessage": "Tools that repair things. What's not to understand? Get back to work."
  },
  "settlerTools.name": {
    "id": "Material.settlerTools.name",
    "defaultMessage": "Power Tools"
  },
  "settlerTools.description": {
    "id": "Material.settlerTools.description",
    "defaultMessage": "These whirring, blinking, and noisy companions of modern settlers have come a long way since the first sharpened rock back on Earth."
  },
  "shipRepairDrone.name": {
    "id": "Material.shipRepairDrone.name",
    "defaultMessage": "Ship-Repair Drone"
  },
  "shipRepairDrone.description": {
    "id": "Material.shipRepairDrone.description",
    "defaultMessage": "A drone set up to autonomously perform basic repair and maintenance tasks on all kinds of spaceships."
  },
  "silicon.name": {
    "id": "Material.silicon.name",
    "defaultMessage": "Silicon"
  },
  "silicon.description": {
    "id": "Material.silicon.description",
    "defaultMessage": "A hard and brittle crystalline solid that is often used for its properties as a semiconductor.  Most often found in various forms of silicon dioxide (silica) or silicate minerals."
  },
  "siliconOre.name": {
    "id": "Material.siliconOre.name",
    "defaultMessage": "Silicon Ore"
  },
  "siliconOre.description": {
    "id": "Material.siliconOre.description",
    "defaultMessage": "On the markets, the term \"Silicon Ore\" is used as a shorthand for different products yielding silicone when smelted down, such as quartzite or sand."
  },
  "silkProcessed.name": {
    "id": "Material.silkProcessed.name",
    "defaultMessage": "Silken Fabric"
  },
  "silkProcessed.description": {
    "id": "Material.silkProcessed.description",
    "defaultMessage": "One of the few remaining fibres with a natural origin, silk nowadays has some niche uses in the clothing industry."
  },
  "silkRaw.name": {
    "id": "Material.silkRaw.name",
    "defaultMessage": "Raw Silk Strains"
  },
  "silkRaw.description": {
    "id": "Material.silkRaw.description",
    "defaultMessage": "The start of a long journey to sophisticated clothing such as AI-assisted lab coats."
  },
  "smallCapacitorBank.name": {
    "id": "Material.smallCapacitorBank.name",
    "defaultMessage": "Small Capacitor Bank"
  },
  "smallCapacitorBank.description": {
    "id": "Material.smallCapacitorBank.description",
    "defaultMessage": "Stores a small amount of energy."
  },
  "smallCargoBay.name": {
    "id": "Material.smallCargoBay.name",
    "defaultMessage": "Small Cargo Bay Kit"
  },
  "smallCargoBay.description": {
    "id": "Material.smallCargoBay.description",
    "defaultMessage": "Everything you need to build a small cargo bay."
  },
  "smallDeviceCover.name": {
    "id": "Material.smallDeviceCover.name",
    "defaultMessage": "Durable Casing S"
  },
  "smallDeviceCover.description": {
    "id": "Material.smallDeviceCover.description",
    "defaultMessage": "A 3D-printed, plastic-based cover for various small electronic devices."
  },
  "smallEmitter.name": {
    "id": "Material.smallEmitter.name",
    "defaultMessage": "Small FTL Emitter"
  },
  "smallEmitter.description": {
    "id": "Material.smallEmitter.description",
    "defaultMessage": "A small FTL emitter requiring relatively little power to create an FTL field spanning a small volume."
  },
  "smallFtlTank.name": {
    "id": "Material.smallFtlTank.name",
    "defaultMessage": "Small FTL Fuel Tank Kit"
  },
  "smallFtlTank.description": {
    "id": "Material.smallFtlTank.description",
    "defaultMessage": "Everything you need to build a small FTL fuel tank."
  },
  "smallPlasticsBoard.name": {
    "id": "Material.smallPlasticsBoard.name",
    "defaultMessage": "Polymer Sheet Type S"
  },
  "smallPlasticsBoard.description": {
    "id": "Material.smallPlasticsBoard.description",
    "defaultMessage": "..."
  },
  "smallShipRepairDroneUnit.name": {
    "id": "Material.smallShipRepairDroneUnit.name",
    "defaultMessage": "Small Ship-Repair Drone Operations Unit"
  },
  "smallShipRepairDroneUnit.description": {
    "id": "Material.smallShipRepairDroneUnit.description",
    "defaultMessage": "A control unit for a small set of drones able to consistently repair any kind of damage a ship takes during space flight."
  },
  "smallStlTank.name": {
    "id": "Material.smallStlTank.name",
    "defaultMessage": "Small STL Fuel Tank Kit"
  },
  "smallStlTank.description": {
    "id": "Material.smallStlTank.description",
    "defaultMessage": "Everything you need to build a small STL fuel tank."
  },
  "sodium.name": {
    "id": "Material.sodium.name",
    "defaultMessage": "Sodium"
  },
  "sodium.description": {
    "id": "Material.sodium.description",
    "defaultMessage": "An essential element in human biology and industry."
  },
  "sodiumBorohydride.name": {
    "id": "Material.sodiumBorohydride.name",
    "defaultMessage": "Sodium Borohydride"
  },
  "sodiumBorohydride.description": {
    "id": "Material.sodiumBorohydride.description",
    "defaultMessage": "A versatile chemical agent that chemists rely upon to get the job done. Known to be extremely flammable if left unchecked, it’s best to store it in a safe location.\nMass production of this compound originated on old Earth and was first achieved by chemists from Gladi Research Group, Lab 0-99."
  },
  "solarCell.name": {
    "id": "Material.solarCell.name",
    "defaultMessage": "Solar Cell"
  },
  "solarCell.description": {
    "id": "Material.solarCell.description",
    "defaultMessage": "A single solar cell to turn sunlight into energy."
  },
  "solarPanel.name": {
    "id": "Material.solarPanel.name",
    "defaultMessage": "Solar Panel"
  },
  "solarPanel.description": {
    "id": "Material.solarPanel.description",
    "defaultMessage": "High-efficiency solar panels have become the most prevalent means of energy extraction in space and on sunnier planets."
  },
  "sortingAlgorithm.name": {
    "id": "Material.sortingAlgorithm.name",
    "defaultMessage": "Sorting Algorithm"
  },
  "sortingAlgorithm.description": {
    "id": "Material.sortingAlgorithm.description",
    "defaultMessage": "An algorithm for sorting data."
  },
  "specializedRadiationShielding.name": {
    "id": "Material.specializedRadiationShielding.name",
    "defaultMessage": "Specialized Anti-rad Plate"
  },
  "specializedRadiationShielding.description": {
    "id": "Material.specializedRadiationShielding.description",
    "defaultMessage": "These plates protect a ship from taking damage from typical large-star radiation levels."
  },
  "stabilitySupportSystem.name": {
    "id": "Material.stabilitySupportSystem.name",
    "defaultMessage": "Stability Support System"
  },
  "stabilitySupportSystem.description": {
    "id": "Material.stabilitySupportSystem.description",
    "defaultMessage": "A system that helps pilot safely through extremely high- or low-gravity atmospheres."
  },
  "standardEngine.name": {
    "id": "Material.standardEngine.name",
    "defaultMessage": "Standard STL Engine"
  },
  "standardEngine.description": {
    "id": "Material.standardEngine.description",
    "defaultMessage": "Standard STL engine with decent thrust and manageable fuel consumption."
  },
  "standardReactor.name": {
    "id": "Material.standardReactor.name",
    "defaultMessage": "Standard FTL Reactor"
  },
  "standardReactor.description": {
    "id": "Material.standardReactor.description",
    "defaultMessage": "A standard FTL reactor."
  },
  "steel.name": {
    "id": "Material.steel.name",
    "defaultMessage": "Steel"
  },
  "steel.description": {
    "id": "Material.steel.description",
    "defaultMessage": "An iron-based alloy with high tensile strength, steel is considered too heavy for most uses in space, but remains the ideal solution for many planetary construction components."
  },
  "stlFuel.name": {
    "id": "Material.stlFuel.name",
    "defaultMessage": "STL Fuel"
  },
  "stlFuel.description": {
    "id": "Material.stlFuel.description",
    "defaultMessage": "While this liquid still resembles fuel of past centuries in smell and viscosity, today's formula is required in much smaller amounts due to vastly more efficient drives."
  },
  "structuralSpacecraftComponent.name": {
    "id": "Material.structuralSpacecraftComponent.name",
    "defaultMessage": "Structural Spacecraft Component"
  },
  "structuralSpacecraftComponent.description": {
    "id": "Material.structuralSpacecraftComponent.description",
    "defaultMessage": "Spacecrafts consists of many different parts held together by structural components."
  },
  "sulfur.name": {
    "id": "Material.sulfur.name",
    "defaultMessage": "Sulfur"
  },
  "sulfur.description": {
    "id": "Material.sulfur.description",
    "defaultMessage": "Elemental sulfur is bright yellow and solid at room temperature."
  },
  "sulfurCrystals.name": {
    "id": "Material.sulfurCrystals.name",
    "defaultMessage": "Sulfur Crystals"
  },
  "sulfurCrystals.description": {
    "id": "Material.sulfurCrystals.description",
    "defaultMessage": "Sulfur is typically found in sulfide and sulfate minerals in nature."
  },
  "surgeryUnit.name": {
    "id": "Material.surgeryUnit.name",
    "defaultMessage": "Surgery Unit"
  },
  "surgeryUnit.description": {
    "id": "Material.surgeryUnit.description",
    "defaultMessage": "A building-ready medical unit to perform surgical procedures in."
  },
  "surgicalDrone.name": {
    "id": "Material.surgicalDrone.name",
    "defaultMessage": "Surgical Drone"
  },
  "surgicalDrone.description": {
    "id": "Material.surgicalDrone.description",
    "defaultMessage": "A drone designed to support a surgeon at work. Once you get used to the buzzing, it's very helpful!"
  },
  "surgicalEquipment.name": {
    "id": "Material.surgicalEquipment.name",
    "defaultMessage": "Surgical Equipment"
  },
  "surgicalEquipment.description": {
    "id": "Material.surgicalEquipment.description",
    "defaultMessage": "All kinds of scalpels, clips and swabs."
  },
  "surveillanceDrone.name": {
    "id": "Material.surveillanceDrone.name",
    "defaultMessage": "Surveillance Drone"
  },
  "surveillanceDrone.description": {
    "id": "Material.surveillanceDrone.description",
    "defaultMessage": "A drone designed to observe, scan and report. Most people don't like them."
  },
  "tantalite.name": {
    "id": "Material.tantalite.name",
    "defaultMessage": "Tantalite Rock"
  },
  "tantalite.description": {
    "id": "Material.tantalite.description",
    "defaultMessage": "Rich in the element tantalum the mineral tantalite is similar to the mineral columbite and the two are commonly referred to as coltan.  Tantalum is used in tantalum capacitors and coltan is also an important source of niobium."
  },
  "tantalum.name": {
    "id": "Material.tantalum.name",
    "defaultMessage": "Tantalum"
  },
  "tantalum.description": {
    "id": "Material.tantalum.description",
    "defaultMessage": "A rare and high corrosion resistant metal."
  },
  "targetingComputer.name": {
    "id": "Material.targetingComputer.name",
    "defaultMessage": "Targeting Computer"
  },
  "targetingComputer.description": {
    "id": "Material.targetingComputer.description",
    "defaultMessage": "Measure twice, cut once."
  },
  "tclAcid.name": {
    "id": "Material.tclAcid.name",
    "defaultMessage": "TCL Acid"
  },
  "tclAcid.description": {
    "id": "Material.tclAcid.description",
    "defaultMessage": "Terephthaloyl chloride is one of the components necessary in the production of kevlar."
  },
  "technetium.name": {
    "id": "Material.technetium.name",
    "defaultMessage": "Technetium"
  },
  "technetium.description": {
    "id": "Material.technetium.description",
    "defaultMessage": "All isotopes of Technetium are radioactive and it is typically found naturally only as a decay product of other elements such as Uranium and Thorium."
  },
  "technetiumOxide.name": {
    "id": "Material.technetiumOxide.name",
    "defaultMessage": "Technetium Oxide"
  },
  "technetiumOxide.description": {
    "id": "Material.technetiumOxide.description",
    "defaultMessage": "A yellow volatile solid."
  },
  "technetiumStabilizers.name": {
    "id": "Material.technetiumStabilizers.name",
    "defaultMessage": "Stabilized Technetium"
  },
  "technetiumStabilizers.description": {
    "id": "Material.technetiumStabilizers.description",
    "defaultMessage": "The Technetium isotope Technetium-97 can be used as a stabilized form of Technetium is put into a fully ionized state."
  },
  "technicianClothing.name": {
    "id": "Material.technicianClothing.name",
    "defaultMessage": "HazMat Work Suit"
  },
  "technicianClothing.description": {
    "id": "Material.technicianClothing.description",
    "defaultMessage": "With its near impervious fabric and the air tank installed on its back, this suit allows for work with hazardous materials and in hostile environments."
  },
  "technicianHealth.name": {
    "id": "Material.technicianHealth.name",
    "defaultMessage": "Basic Medical Kit"
  },
  "technicianHealth.description": {
    "id": "Material.technicianHealth.description",
    "defaultMessage": "Mostly intended to help with injuries, this kit contains a handheld scanner and self-expanding medical foam alongside the usual first aid equipment."
  },
  "technicianLuxuryDrink.name": {
    "id": "Material.technicianLuxuryDrink.name",
    "defaultMessage": "Stellar Pale Ale"
  },
  "technicianLuxuryDrink.description": {
    "id": "Material.technicianLuxuryDrink.description",
    "defaultMessage": "A light beer brewed from water, hop, and malt. Some claim that it can't hold a candle to its terrestrial ancestors."
  },
  "technicianLuxuryHealth.name": {
    "id": "Material.technicianLuxuryHealth.name",
    "defaultMessage": "Stem Cell Treatment"
  },
  "technicianLuxuryHealth.description": {
    "id": "Material.technicianLuxuryHealth.description",
    "defaultMessage": "Aging was considered an irreversible process. In the future that no longer rings true."
  },
  "technicianTools.name": {
    "id": "Material.technicianTools.name",
    "defaultMessage": "Multi-Purpose Scanner"
  },
  "technicianTools.description": {
    "id": "Material.technicianTools.description",
    "defaultMessage": "A powerful and essential tool able to run diagnostics and find faults in a great variety of machines."
  },
  "technoKevlar.name": {
    "id": "Material.technoKevlar.name",
    "defaultMessage": "TechnoKevlar Fabric"
  },
  "technoKevlar.description": {
    "id": "Material.technoKevlar.description",
    "defaultMessage": "Technetium enhanced kevlar fabric for specialized applications."
  },
  "tectosilisite.name": {
    "id": "Material.tectosilisite.name",
    "defaultMessage": "Tectosilisite"
  },
  "tectosilisite.description": {
    "id": "Material.tectosilisite.description",
    "defaultMessage": "Tectosilisite is a very silicon-rich regolith found on planets with a thin or no atmosphere at all. Its rather high He-3 contents make it interesting for fuel production."
  },
  "tensorProcessingUnit.name": {
    "id": "Material.tensorProcessingUnit.name",
    "defaultMessage": "Tensor Processing Unit"
  },
  "tensorProcessingUnit.description": {
    "id": "Material.tensorProcessingUnit.description",
    "defaultMessage": "An electronic system specifically designed to quickly process tensors for neural networks and other applications."
  },
  "testTubes.name": {
    "id": "Material.testTubes.name",
    "defaultMessage": "Test Tubes"
  },
  "testTubes.description": {
    "id": "Material.testTubes.description",
    "defaultMessage": "A popular piece of laboratory equipment used to hold test samples."
  },
  "thermalShielding.name": {
    "id": "Material.thermalShielding.name",
    "defaultMessage": "Thermal Shielding"
  },
  "thermalShielding.description": {
    "id": "Material.thermalShielding.description",
    "defaultMessage": "These actively cooled, heat-deflecting modules must be distributed along the outer walls of buildings located on planets with an average temperature of more than 75° C."
  },
  "thermoFluid.name": {
    "id": "Material.thermoFluid.name",
    "defaultMessage": "ThermoFluid"
  },
  "thermoFluid.description": {
    "id": "Material.thermoFluid.description",
    "defaultMessage": "This high-performance heat transfer fluid can be used from small scale applications like CPU coolers up to building-sized thermal shields."
  },
  "tinyCargoBay.name": {
    "id": "Material.tinyCargoBay.name",
    "defaultMessage": "Tiny Cargo Bay Kit"
  },
  "tinyCargoBay.description": {
    "id": "Material.tinyCargoBay.description",
    "defaultMessage": "Everything you need to build a tiny cargo bay."
  },
  "titanium.name": {
    "id": "Material.titanium.name",
    "defaultMessage": "Titanium"
  },
  "titanium.description": {
    "id": "Material.titanium.description",
    "defaultMessage": "Lightweight, strong, and resistant to corrosion, titanium and its alloys have become a staple (not only) of the aerospace industry."
  },
  "titaniumOre.name": {
    "id": "Material.titaniumOre.name",
    "defaultMessage": "Titanium Ore"
  },
  "titaniumOre.description": {
    "id": "Material.titaniumOre.description",
    "defaultMessage": "Titanium oxide minerals rutile and ilmenite are the most common minerals in titanium ore bodies."
  },
  "touchDeviceBlank.name": {
    "id": "Material.touchDeviceBlank.name",
    "defaultMessage": "Handheld Personal Console"
  },
  "touchDeviceBlank.description": {
    "id": "Material.touchDeviceBlank.description",
    "defaultMessage": "Data and computing power right in the palm of your hand."
  },
  "touchScreen.name": {
    "id": "Material.touchScreen.name",
    "defaultMessage": "Capacitive Display"
  },
  "touchScreen.description": {
    "id": "Material.touchScreen.description",
    "defaultMessage": "An input device typically deployed on top of an electronic display.  More commonly known as a touch screen."
  },
  "transistor.name": {
    "id": "Material.transistor.name",
    "defaultMessage": "Advanced Transistor"
  },
  "transistor.description": {
    "id": "Material.transistor.description",
    "defaultMessage": "A transistor amplifies or switches electrical signals and power. This is an advanced model."
  },
  "translucentMaterial.name": {
    "id": "Material.translucentMaterial.name",
    "defaultMessage": "Glass"
  },
  "translucentMaterial.description": {
    "id": "Material.translucentMaterial.description",
    "defaultMessage": "This traditional form of glass is rarely used on its own nowadays, but rather combined with new materials to withstand the stress and strain of the space age."
  },
  "traumaCareUnit.name": {
    "id": "Material.traumaCareUnit.name",
    "defaultMessage": "Trauma Care Unit"
  },
  "traumaCareUnit.description": {
    "id": "Material.traumaCareUnit.description",
    "defaultMessage": "Had an accident? This is where you'll be taken care of."
  },
  "truss.name": {
    "id": "Material.truss.name",
    "defaultMessage": "Truss"
  },
  "truss.description": {
    "id": "Material.truss.description",
    "defaultMessage": "A stable relationship between structural components is built on truss."
  },
  "tungstenAluminiumAlloy.name": {
    "id": "Material.tungstenAluminiumAlloy.name",
    "defaultMessage": "Alpha-Stabilized Tungsten"
  },
  "tungstenAluminiumAlloy.description": {
    "id": "Material.tungstenAluminiumAlloy.description",
    "defaultMessage": "Able to endure extreme heat, this alloy is typically used for thermal protection purposes for spaceships or high-thrust engines."
  },
  "tungstenResource.name": {
    "id": "Material.tungstenResource.name",
    "defaultMessage": "Bacterial Tungsten Solution"
  },
  "tungstenResource.description": {
    "id": "Material.tungstenResource.description",
    "defaultMessage": "Tungsten can be recovered from scrap by using microorganisms to absorb it enabling recovery. This process sometimes occurs naturally when microorganisms come in contact with tungsten bearing minerals."
  },
  "twoDimensionalDisplay.name": {
    "id": "Material.twoDimensionalDisplay.name",
    "defaultMessage": "Information Display"
  },
  "twoDimensionalDisplay.description": {
    "id": "Material.twoDimensionalDisplay.description",
    "defaultMessage": "An output device that displays data."
  },
  "universalToolset.name": {
    "id": "Material.universalToolset.name",
    "defaultMessage": "Universal Toolset"
  },
  "universalToolset.description": {
    "id": "Material.universalToolset.description",
    "defaultMessage": "A collection of high-quality tools to fix everyday appliances or to hone your handcrafting skills."
  },
  "universeMap.name": {
    "id": "Material.universeMap.name",
    "defaultMessage": "Spatial Navigation Map"
  },
  "universeMap.description": {
    "id": "Material.universeMap.description",
    "defaultMessage": "A map of the known universe and all its related data."
  },
  "verySmallCargoBay.name": {
    "id": "Material.verySmallCargoBay.name",
    "defaultMessage": "Very Small Cargo Bay Kit"
  },
  "verySmallCargoBay.description": {
    "id": "Material.verySmallCargoBay.description",
    "defaultMessage": "Everything you need to build a very small cargo bay."
  },
  "vitaEssence.name": {
    "id": "Material.vitaEssence.name",
    "defaultMessage": "Vita Essence"
  },
  "vitaEssence.description": {
    "id": "Material.vitaEssence.description",
    "defaultMessage": "Healthy, tasty, nutritious."
  },
  "waferMedium.name": {
    "id": "Material.waferMedium.name",
    "defaultMessage": "Medium Wafer"
  },
  "waferMedium.description": {
    "id": "Material.waferMedium.description",
    "defaultMessage": "A medium sized disk of crystalline silicon used in the fabrication of electronics."
  },
  "waferSmall.name": {
    "id": "Material.waferSmall.name",
    "defaultMessage": "Small Wafer"
  },
  "waferSmall.description": {
    "id": "Material.waferSmall.description",
    "defaultMessage": "A small sized disk of crystalline silicon used in the fabrication of electronics."
  },
  "water.name": {
    "id": "Material.water.name",
    "defaultMessage": "Water"
  },
  "water.description": {
    "id": "Material.water.description",
    "defaultMessage": "It should be no surprise that the liquid making up 60 % of our bodies is used in almost all processes concerning the production of nourishment across the universe."
  },
  "waterFilter.name": {
    "id": "Material.waterFilter.name",
    "defaultMessage": "Active Water Filter"
  },
  "waterFilter.description": {
    "id": "Material.waterFilter.description",
    "defaultMessage": "Water filtration equipment that actively monitors water conditions and applied remediation as needed."
  },
  "waterRecycler.name": {
    "id": "Material.waterRecycler.name",
    "defaultMessage": "Water Reclaimer"
  },
  "waterRecycler.description": {
    "id": "Material.waterRecycler.description",
    "defaultMessage": "Equipment for the reclaiming usable clean water from biological wastes and industrial effluents."
  },
  "weakArtificalIntelligence.name": {
    "id": "Material.weakArtificalIntelligence.name",
    "defaultMessage": "Weak Artificial Intelligence"
  },
  "weakArtificalIntelligence.description": {
    "id": "Material.weakArtificalIntelligence.description",
    "defaultMessage": "AI optimized for a specific task or application.  Definitely not a general purpose AI that will learn at an alarming rate, become self aware and create problems for humanity."
  },
  "windowManager.name": {
    "id": "Material.windowManager.name",
    "defaultMessage": "Window Manager"
  },
  "windowManager.description": {
    "id": "Material.windowManager.description",
    "defaultMessage": "..."
  },
  "wolfram.name": {
    "id": "Material.wolfram.name",
    "defaultMessage": "Tungsten"
  },
  "wolfram.description": {
    "id": "Material.wolfram.description",
    "defaultMessage": "A rare metal with the highest melting point of all the known elements. Also known as Wolfram."
  },
  "workstationBlank.name": {
    "id": "Material.workstationBlank.name",
    "defaultMessage": "Basic Workstation"
  },
  "workstationBlank.description": {
    "id": "Material.workstationBlank.description",
    "defaultMessage": "A basic computer workstation."
  },
  "zircon.name": {
    "id": "Material.zircon.name",
    "defaultMessage": "Zircon Crystals"
  },
  "zircon.description": {
    "id": "Material.zircon.description",
    "defaultMessage": "The mineral Zircon can be processed into metallic zirconium."
  },
  "zirconium.name": {
    "id": "Material.zirconium.name",
    "defaultMessage": "Zirconium"
  },
  "zirconium.description": {
    "id": "Material.zirconium.description",
    "defaultMessage": "Zirconium has many applications including in nuclear reactors as cladding for fuel rods and as corrosion resistant material in chemical processing equipment."
  }
})
export const buildingTranslations = transform({ // NOTE: called SectionMessages
  "advancedAppliancesFactory.name": {
      "id": "Reactor.advancedAppliancesFactory.name",
      "defaultMessage": "Advanced Appliances Factory"
  },
  "advancedAppliancesFactory.description": {
      "id": "Reactor.advancedAppliancesFactory.description",
      "defaultMessage": "Produces advanced appliances, often used in space ships and space stations."
  },
  "advancedMaterialLab.name": {
      "id": "Reactor.advancedMaterialLab.name",
      "defaultMessage": "Advanced Material Lab"
  },
  "advancedMaterialLab.description": {
      "id": "Reactor.advancedMaterialLab.description",
      "defaultMessage": "Refines intermediate rare materials into more usable forms."
  },
  "advancedSmelter.name": {
      "id": "Reactor.advancedSmelter.name",
      "defaultMessage": "High-Power Blast Furnace"
  },
  "advancedSmelter.description": {
      "id": "Reactor.advancedSmelter.description",
      "defaultMessage": "Allows for the creation of high-performance metal alloys."
  },
  "appliancesFactory.name": {
      "id": "Reactor.appliancesFactory.name",
      "defaultMessage": "Appliances Factory"
  },
  "appliancesFactory.description": {
      "id": "Reactor.appliancesFactory.description",
      "defaultMessage": "Produces large appliances, often used in space ships and space stations."
  },
  "basicMaterialsPlant.name": {
      "id": "Reactor.basicMaterialsPlant.name",
      "defaultMessage": "Basic Materials Plant"
  },
  "basicMaterialsPlant.description": {
      "id": "Reactor.basicMaterialsPlant.description",
      "defaultMessage": "Produces a host of materials and end products needed to bootstrap a colony."
  },
  "chemPlant.name": {
      "id": "Reactor.chemPlant.name",
      "defaultMessage": "Chemical Plant"
  },
  "chemPlant.description": {
      "id": "Reactor.chemPlant.description",
      "defaultMessage": "Produces various chemical compounds and immediate products."
  },
  "cleanRoom.name": {
      "id": "Reactor.cleanRoom.name",
      "defaultMessage": "Cleanroom"
  },
  "cleanRoom.description": {
      "id": "Reactor.cleanRoom.description",
      "defaultMessage": "Produces integrated circuits and basic computer parts."
  },
  "clothingFactory.name": {
      "id": "Reactor.clothingFactory.name",
      "defaultMessage": "Textile Manufacturing"
  },
  "clothingFactory.description": {
      "id": "Reactor.clothingFactory.description",
      "defaultMessage": "Manufactures textiles from different fibers, used in clothing and even ship construction."
  },
  "collector.name": {
      "id": "Reactor.collector.name",
      "defaultMessage": "Collector"
  },
  "collector.description": {
      "id": "Reactor.collector.description",
      "defaultMessage": "Extracts gases from the atmosphere."
  },
  "coreModule.name": {
      "id": "Reactor.coreModule.name",
      "defaultMessage": "Core Module"
  },
  "coreModule.description": {
      "id": "Reactor.coreModule.description",
      "defaultMessage": "The basic module and life support necessary to start a new base on a planet."
  },
  "corporationProjectFTLLaboratory.name": {
      "id": "Reactor.corporationProjectFTLLaboratory.name",
      "defaultMessage": "Corporation FTL Laboratory"
  },
  "corporationProjectFTLLaboratory.description": {
      "id": "Reactor.corporationProjectFTLLaboratory.description",
      "defaultMessage": "NO FUNCTIONALITY - Prestige Building"
  },
  "corporationProjectHeadquarters.name": {
      "id": "Reactor.corporationProjectHeadquarters.name",
      "defaultMessage": "Corporation Headquarters"
  },
  "corporationProjectHeadquarters.description": {
      "id": "Reactor.corporationProjectHeadquarters.description",
      "defaultMessage": "The physical headquarter of any corporation, running basic administrative functions."
  },
  "corporationProjectImmortality.name": {
      "id": "Reactor.corporationProjectImmortality.name",
      "defaultMessage": "Corporate Immortality Center"
  },
  "corporationProjectImmortality.description": {
      "id": "Reactor.corporationProjectImmortality.description",
      "defaultMessage": "NO FUNCTIONALITY - Prestige Building"
  },
  "corporationProjectTerraforming.name": {
      "id": "Reactor.corporationProjectTerraforming.name",
      "defaultMessage": "Corporate Terraformer"
  },
  "corporationProjectTerraforming.description": {
      "id": "Reactor.corporationProjectTerraforming.description",
      "defaultMessage": "NO FUNCTIONALITY - Prestige Building"
  },
  "droneShop.name": {
      "id": "Reactor.droneShop.name",
      "defaultMessage": "Drone Shop"
  },
  "droneShop.description": {
      "id": "Reactor.droneShop.description",
      "defaultMessage": "The place where all things drones are put together."
  },
  "einsteiniumEnrichmentPlant.name": {
      "id": "Reactor.einsteiniumEnrichmentPlant.name",
      "defaultMessage": "Einsteinium Enrichment"
  },
  "einsteiniumEnrichmentPlant.description": {
      "id": "Reactor.einsteiniumEnrichmentPlant.description",
      "defaultMessage": "Specialized plant that turns Liquid Einsteinium into its more usable, stabilized form."
  },
  "electronicDeviceManufactory.name": {
      "id": "Reactor.electronicDeviceManufactory.name",
      "defaultMessage": "Electronic Device Manufactory"
  },
  "electronicDeviceManufactory.description": {
      "id": "Reactor.electronicDeviceManufactory.description",
      "defaultMessage": "Manufactures a variety of small end-user-ready devices."
  },
  "electronicsPlant.name": {
      "id": "Reactor.electronicsPlant.name",
      "defaultMessage": "Electronics Plant"
  },
  "electronicsPlant.description": {
      "id": "Reactor.electronicsPlant.description",
      "defaultMessage": "Uses basic computer parts to manufacture larger computers and control units."
  },
  "energyComponentAssembly.name": {
      "id": "Reactor.energyComponentAssembly.name",
      "defaultMessage": "Energy Component Assembly"
  },
  "energyComponentAssembly.description": {
      "id": "Reactor.energyComponentAssembly.description",
      "defaultMessage": "Creates energy supply systems and devices of all kinds."
  },
  "extractor.name": {
      "id": "Reactor.extractor.name",
      "defaultMessage": "Extractor"
  },
  "extractor.description": {
      "id": "Reactor.extractor.description",
      "defaultMessage": "Extracts ores and minerals from the surface."
  },
  "farm.name": {
      "id": "Reactor.farm.name",
      "defaultMessage": "Farmstead"
  },
  "farm.description": {
      "id": "Reactor.farm.description",
      "defaultMessage": "Produces agricultural products like grains and soy. Needs fertile soil."
  },
  "fermentationFacility.name": {
      "id": "Reactor.fermentationFacility.name",
      "defaultMessage": "Fermenter"
  },
  "fermentationFacility.description": {
      "id": "Reactor.fermentationFacility.description",
      "defaultMessage": "Creates those beverages that make life in space just a little bit more bearable."
  },
  "fineSmithy.name": {
      "id": "Reactor.fineSmithy.name",
      "defaultMessage": "Metalist Studio"
  },
  "fineSmithy.description": {
      "id": "Reactor.fineSmithy.description",
      "defaultMessage": "Produces the often unnoticed small, metal pieces that make up the core of many installations."
  },
  "foodProcessor.name": {
      "id": "Reactor.foodProcessor.name",
      "defaultMessage": "Food Processor"
  },
  "foodProcessor.description": {
      "id": "Reactor.foodProcessor.description",
      "defaultMessage": "Uses agricultural products to produce edible consumables."
  },
  "glassFurnace.name": {
      "id": "Reactor.glassFurnace.name",
      "defaultMessage": "Glass Furnace"
  },
  "glassFurnace.description": {
      "id": "Reactor.glassFurnace.description",
      "defaultMessage": "Creates different glasses and other sturdy materials at very high temperatures."
  },
  "habitationBarracks.name": {
      "id": "Reactor.habitationBarracks.name",
      "defaultMessage": "Barracks"
  },
  "habitationBarracks.description": {
      "id": "Reactor.habitationBarracks.description",
      "defaultMessage": "Offers housing for 75 pioneers and 75 settlers."
  },
  "habitationCommune.name": {
      "id": "Reactor.habitationCommune.name",
      "defaultMessage": "Communal Abode"
  },
  "habitationCommune.description": {
      "id": "Reactor.habitationCommune.description",
      "defaultMessage": "Offers housing for 75 settlers and 75 technicians."
  },
  "habitationEngineer.name": {
      "id": "Reactor.habitationEngineer.name",
      "defaultMessage": "Engineer Habitation"
  },
  "habitationEngineer.description": {
      "id": "Reactor.habitationEngineer.description",
      "defaultMessage": "Offers housing for 100 engineers."
  },
  "habitationLuxury.name": {
      "id": "Reactor.habitationLuxury.name",
      "defaultMessage": "Luxury Residence"
  },
  "habitationLuxury.description": {
      "id": "Reactor.habitationLuxury.description",
      "defaultMessage": "Offers housing for 75 engineers and 75 scientists."
  },
  "habitationManagers.name": {
      "id": "Reactor.habitationManagers.name",
      "defaultMessage": "Management Domicile"
  },
  "habitationManagers.description": {
      "id": "Reactor.habitationManagers.description",
      "defaultMessage": "Offers housing for 75 technicians and 75 engineers."
  },
  "habitationPioneer.name": {
      "id": "Reactor.habitationPioneer.name",
      "defaultMessage": "Pioneer Habitation"
  },
  "habitationPioneer.description": {
      "id": "Reactor.habitationPioneer.description",
      "defaultMessage": "Offers housing for 100 pioneers."
  },
  "habitationScientist.name": {
      "id": "Reactor.habitationScientist.name",
      "defaultMessage": "Scientist Habitation"
  },
  "habitationScientist.description": {
      "id": "Reactor.habitationScientist.description",
      "defaultMessage": "Offers housing for 100 scientists."
  },
  "habitationSettler.name": {
      "id": "Reactor.habitationSettler.name",
      "defaultMessage": "Settler Habitation"
  },
  "habitationSettler.description": {
      "id": "Reactor.habitationSettler.description",
      "defaultMessage": "Offers housing for  100 settlers."
  },
  "habitationTechnician.name": {
      "id": "Reactor.habitationTechnician.name",
      "defaultMessage": "Technician Habitation"
  },
  "habitationTechnician.description": {
      "id": "Reactor.habitationTechnician.description",
      "defaultMessage": "Offers housing for 100 technicians."
  },
  "hullWeldingPlant.name": {
      "id": "Reactor.hullWeldingPlant.name",
      "defaultMessage": "Hull Welding Plant"
  },
  "hullWeldingPlant.description": {
      "id": "Reactor.hullWeldingPlant.description",
      "defaultMessage": "Creates a variety of ship hull plates and shields."
  },
  "hydroponicsFarm.name": {
      "id": "Reactor.hydroponicsFarm.name",
      "defaultMessage": "Hydroponics Farm"
  },
  "hydroponicsFarm.description": {
      "id": "Reactor.hydroponicsFarm.description",
      "defaultMessage": "Produces agricultural products like hydrocarbon plants. Does not need fertile soil but lots of water."
  },
  "inVitroPlant.name": {
      "id": "Reactor.inVitroPlant.name",
      "defaultMessage": "In-Vitro Plant"
  },
  "inVitroPlant.description": {
      "id": "Reactor.inVitroPlant.description",
      "defaultMessage": "Deals with the creation of artificial life and meat products."
  },
  "incinerator.name": {
      "id": "Reactor.incinerator.name",
      "defaultMessage": "Incinerator"
  },
  "incinerator.description": {
      "id": "Reactor.incinerator.description",
      "defaultMessage": "Turns organically grown plants into life's most basic resource, Carbon."
  },
  "laboratory.name": {
      "id": "Reactor.laboratory.name",
      "defaultMessage": "Laboratory"
  },
  "laboratory.description": {
      "id": "Reactor.laboratory.description",
      "defaultMessage": "Advanced laboratory that deals in more complex chemical reactions."
  },
  "mediumComponentsAssembly.name": {
      "id": "Reactor.mediumComponentsAssembly.name",
      "defaultMessage": "Medium Components Assembly"
  },
  "mediumComponentsAssembly.description": {
      "id": "Reactor.mediumComponentsAssembly.description",
      "defaultMessage": "Assembles technical pieces into larger parts, ready to be used in many devices."
  },
  "orchard.name": {
      "id": "Reactor.orchard.name",
      "defaultMessage": "Orchard"
  },
  "orchard.description": {
      "id": "Reactor.orchard.description",
      "defaultMessage": "A specialized farm that produces high-maintenance fruits for high-end consumables."
  },
  "pharmaFactory.name": {
      "id": "Reactor.pharmaFactory.name",
      "defaultMessage": "Pharma Factory"
  },
  "pharmaFactory.description": {
      "id": "Reactor.pharmaFactory.description",
      "defaultMessage": "A versatile factory equipped to produce medication as well as curative support products."
  },
  "planetaryProjectAdminCenter.name": {
      "id": "Reactor.planetaryProjectAdminCenter.name",
      "defaultMessage": "Administration Center"
  },
  "planetaryProjectAdminCenter.description": {
      "id": "Reactor.planetaryProjectAdminCenter.description",
      "defaultMessage": "The Administration Center allows to hold elections for a planetary governor. The governor can set taxes and fees like a production fee for example. Every site owner has the right to vote, but votes can also be acquired by completing tasks set up by the Exodus Council."
  },
  "planetaryProjectCogc.name": {
      "id": "Reactor.planetaryProjectCogc.name",
      "defaultMessage": "Chamber of Global Commerce"
  },
  "planetaryProjectCogc.description": {
      "id": "Reactor.planetaryProjectCogc.description",
      "defaultMessage": "Allows for the communal implementation of industrial support programs."
  },
  "planetaryProjectComfortBig.name": {
      "id": "Reactor.planetaryProjectComfortBig.name",
      "defaultMessage": "4D Arcades"
  },
  "planetaryProjectComfortBig.description": {
      "id": "Reactor.planetaryProjectComfortBig.description",
      "defaultMessage": "Provides a large amount of comfort."
  },
  "planetaryProjectComfortCulture.name": {
      "id": "Reactor.planetaryProjectComfortCulture.name",
      "defaultMessage": "Art Café"
  },
  "planetaryProjectComfortCulture.description": {
      "id": "Reactor.planetaryProjectComfortCulture.description",
      "defaultMessage": "Provides a small amount of comfort and culture."
  },
  "planetaryProjectComfortSmall.name": {
      "id": "Reactor.planetaryProjectComfortSmall.name",
      "defaultMessage": "Wildlife Park"
  },
  "planetaryProjectComfortSmall.description": {
      "id": "Reactor.planetaryProjectComfortSmall.description",
      "defaultMessage": "Provides a small amount of comfort."
  },
  "planetaryProjectCultureBig.name": {
      "id": "Reactor.planetaryProjectCultureBig.name",
      "defaultMessage": "VR Theater"
  },
  "planetaryProjectCultureBig.description": {
      "id": "Reactor.planetaryProjectCultureBig.description",
      "defaultMessage": "Provides a large amount of culture."
  },
  "planetaryProjectCultureEducation.name": {
      "id": "Reactor.planetaryProjectCultureEducation.name",
      "defaultMessage": "Planetary Broadcasting Hub"
  },
  "planetaryProjectCultureEducation.description": {
      "id": "Reactor.planetaryProjectCultureEducation.description",
      "defaultMessage": "Provides a small amount of culture and education."
  },
  "planetaryProjectCultureSmall.name": {
      "id": "Reactor.planetaryProjectCultureSmall.name",
      "defaultMessage": "Art Gallery"
  },
  "planetaryProjectCultureSmall.description": {
      "id": "Reactor.planetaryProjectCultureSmall.description",
      "defaultMessage": "Provides a small amount of culture."
  },
  "planetaryProjectEducationBig.name": {
      "id": "Reactor.planetaryProjectEducationBig.name",
      "defaultMessage": "University"
  },
  "planetaryProjectEducationBig.description": {
      "id": "Reactor.planetaryProjectEducationBig.description",
      "defaultMessage": "Provides a large amount of education."
  },
  "planetaryProjectEducationSmall.name": {
      "id": "Reactor.planetaryProjectEducationSmall.name",
      "defaultMessage": "Library"
  },
  "planetaryProjectEducationSmall.description": {
      "id": "Reactor.planetaryProjectEducationSmall.description",
      "defaultMessage": "Provides a small amount of education."
  },
  "planetaryProjectHealthBig.name": {
      "id": "Reactor.planetaryProjectHealthBig.name",
      "defaultMessage": "Hospital"
  },
  "planetaryProjectHealthBig.description": {
      "id": "Reactor.planetaryProjectHealthBig.description",
      "defaultMessage": "Provides a large amount of health. "
  },
  "planetaryProjectHealthComfort.name": {
      "id": "Reactor.planetaryProjectHealthComfort.name",
      "defaultMessage": "Wellness Center"
  },
  "planetaryProjectHealthComfort.description": {
      "id": "Reactor.planetaryProjectHealthComfort.description",
      "defaultMessage": "Provides a small amount of health and comfort."
  },
  "planetaryProjectHealthSmall.name": {
      "id": "Reactor.planetaryProjectHealthSmall.name",
      "defaultMessage": "Infirmary"
  },
  "planetaryProjectHealthSmall.description": {
      "id": "Reactor.planetaryProjectHealthSmall.description",
      "defaultMessage": "Provides a small amount of health."
  },
  "planetaryProjectLocalMarket.name": {
      "id": "Reactor.planetaryProjectLocalMarket.name",
      "defaultMessage": "Local Market"
  },
  "planetaryProjectLocalMarket.description": {
      "id": "Reactor.planetaryProjectLocalMarket.description",
      "defaultMessage": "A simple, unregulated, bulletin board style market place."
  },
  "planetaryProjectPopulation.name": {
      "id": "Reactor.planetaryProjectPopulation.name",
      "defaultMessage": "Population Infrastructure"
  },
  "planetaryProjectPopulation.description": {
      "id": "Reactor.planetaryProjectPopulation.description",
      "defaultMessage": "This planetary project is a collection of all infrastructure projects that are relevant for the local population"
  },
  "planetaryProjectSafetyBig.name": {
      "id": "Reactor.planetaryProjectSafetyBig.name",
      "defaultMessage": "Security Drone Post"
  },
  "planetaryProjectSafetyBig.description": {
      "id": "Reactor.planetaryProjectSafetyBig.description",
      "defaultMessage": "Provides a large amount of safety."
  },
  "planetaryProjectSafetyHealth.name": {
      "id": "Reactor.planetaryProjectSafetyHealth.name",
      "defaultMessage": "Emergency Center"
  },
  "planetaryProjectSafetyHealth.description": {
      "id": "Reactor.planetaryProjectSafetyHealth.description",
      "defaultMessage": "Provides a small amount of safety and health."
  },
  "planetaryProjectSafetySmall.name": {
      "id": "Reactor.planetaryProjectSafetySmall.name",
      "defaultMessage": "Safety Station"
  },
  "planetaryProjectSafetySmall.description": {
      "id": "Reactor.planetaryProjectSafetySmall.description",
      "defaultMessage": "Provides a small amount of safety."
  },
  "planetaryProjectShipyard.name": {
      "id": "Reactor.planetaryProjectShipyard.name",
      "defaultMessage": "Planetary Shipyard"
  },
  "planetaryProjectShipyard.description": {
      "id": "Reactor.planetaryProjectShipyard.description",
      "defaultMessage": "Bring your blueprints and materials here to build new ships."
  },
  "planetaryProjectWarehouse.name": {
      "id": "Reactor.planetaryProjectWarehouse.name",
      "defaultMessage": "Planetary Warehouse"
  },
  "planetaryProjectWarehouse.description": {
      "id": "Reactor.planetaryProjectWarehouse.description",
      "defaultMessage": "Offers storage space for rent without the need to own a local site."
  },
  "plasticsPrinterFacility.name": {
      "id": "Reactor.plasticsPrinterFacility.name",
      "defaultMessage": "3D Printer"
  },
  "plasticsPrinterFacility.description": {
      "id": "Reactor.plasticsPrinterFacility.description",
      "defaultMessage": "Prints objects out of plastic pellets."
  },
  "polymerPlant.name": {
      "id": "Reactor.polymerPlant.name",
      "defaultMessage": "Polymer Plant"
  },
  "polymerPlant.description": {
      "id": "Reactor.polymerPlant.description",
      "defaultMessage": "Chemical plant that turns basic elements into flexible polymers, used in all stages of technology."
  },
  "prefabPlant1.name": {
      "id": "Reactor.prefabPlant1.name",
      "defaultMessage": "Prefab Plant MK1"
  },
  "prefabPlant1.description": {
      "id": "Reactor.prefabPlant1.description",
      "defaultMessage": "Produces basic prefabs necessary to construct buildings."
  },
  "prefabPlant2.name": {
      "id": "Reactor.prefabPlant2.name",
      "defaultMessage": "Prefab Plant MK2"
  },
  "prefabPlant2.description": {
      "id": "Reactor.prefabPlant2.description",
      "defaultMessage": "Produces lightweight prefabs necessary to construct buildings."
  },
  "prefabPlant3.name": {
      "id": "Reactor.prefabPlant3.name",
      "defaultMessage": "Prefab Plant MK3"
  },
  "prefabPlant3.description": {
      "id": "Reactor.prefabPlant3.description",
      "defaultMessage": "Produces reinforced prefabs necessary to construct buildings."
  },
  "prefabPlant4.name": {
      "id": "Reactor.prefabPlant4.name",
      "defaultMessage": "Prefab Plant MK4"
  },
  "prefabPlant4.description": {
      "id": "Reactor.prefabPlant4.description",
      "defaultMessage": "Produces advanced prefabs necessary to construct buildings."
  },
  "refinery.name": {
      "id": "Reactor.refinery.name",
      "defaultMessage": "Refinery"
  },
  "refinery.description": {
      "id": "Reactor.refinery.description",
      "defaultMessage": "Produces fuels used for space flight."
  },
  "rig.name": {
      "id": "Reactor.rig.name",
      "defaultMessage": "Rig"
  },
  "rig.description": {
      "id": "Reactor.rig.description",
      "defaultMessage": "Extracts liquid resources."
  },
  "shipKitFactory.name": {
      "id": "Reactor.shipKitFactory.name",
      "defaultMessage": "Ship Kit Factory"
  },
  "shipKitFactory.description": {
      "id": "Reactor.shipKitFactory.description",
      "defaultMessage": "A factory where all kinds of standardized cargo bay and fuel tank kits are put together."
  },
  "smallComponentsAssembly.name": {
      "id": "Reactor.smallComponentsAssembly.name",
      "defaultMessage": "Small Components Assembly"
  },
  "smallComponentsAssembly.description": {
      "id": "Reactor.smallComponentsAssembly.description",
      "defaultMessage": "Assembles technical pieces into smaller parts, ready to be used in many devices."
  },
  "smelter.name": {
      "id": "Reactor.smelter.name",
      "defaultMessage": "Smelter"
  },
  "smelter.description": {
      "id": "Reactor.smelter.description",
      "defaultMessage": "Produces metals from ores."
  },
  "softwareDevelopment.name": {
      "id": "Reactor.softwareDevelopment.name",
      "defaultMessage": "Software Development"
  },
  "softwareDevelopment.description": {
      "id": "Reactor.softwareDevelopment.description",
      "defaultMessage": "Here basic software components are being developed for use in more complex tools and systems."
  },
  "softwareEngineering.name": {
      "id": "Reactor.softwareEngineering.name",
      "defaultMessage": "Software Engineering"
  },
  "softwareEngineering.description": {
      "id": "Reactor.softwareEngineering.description",
      "defaultMessage": "Basic software components are combined into tools that can be applied in a variety of devices or used as parts of more complex systems."
  },
  "softwareLabs.name": {
      "id": "Reactor.softwareLabs.name",
      "defaultMessage": "Software Labs"
  },
  "softwareLabs.description": {
      "id": "Reactor.softwareLabs.description",
      "defaultMessage": "Architects form more advanced software applications from basic algorithms and tools for use in high-end devices."
  },
  "spacecraftPrefabPlant.name": {
      "id": "Reactor.spacecraftPrefabPlant.name",
      "defaultMessage": "Spacecraft Prefab Plant"
  },
  "spacecraftPrefabPlant.description": {
      "id": "Reactor.spacecraftPrefabPlant.description",
      "defaultMessage": "A creation facility for all kinds of kits and standardized spaceship components."
  },
  "spacecraftPropulsionFactory.name": {
      "id": "Reactor.spacecraftPropulsionFactory.name",
      "defaultMessage": "Spacecraft Propulsion Factory"
  },
  "spacecraftPropulsionFactory.description": {
      "id": "Reactor.spacecraftPropulsionFactory.description",
      "defaultMessage": "Produces anything necessary to move a spaceship, i.e. all kinds of STL engines and FTL reactors."
  },
  "storageFacility.name": {
      "id": "Reactor.storageFacility.name",
      "defaultMessage": "Storage Facility"
  },
  "storageFacility.description": {
      "id": "Reactor.storageFacility.description",
      "defaultMessage": "Increases the storage capacity by 5000."
  },
  "technetiumProcessing.name": {
      "id": "Reactor.technetiumProcessing.name",
      "defaultMessage": "Technetium Processing"
  },
  "technetiumProcessing.description": {
      "id": "Reactor.technetiumProcessing.description",
      "defaultMessage": "Processes basic Technetium into a more stable configuration of the element."
  },
  "unitPrefabPlant.name": {
      "id": "Reactor.unitPrefabPlant.name",
      "defaultMessage": "Unit Prefab Plant"
  },
  "unitPrefabPlant.description": {
      "id": "Reactor.unitPrefabPlant.description",
      "defaultMessage": "Produces building units ready to be used as parts of bigger construction projects."
  },
  "weavingPlant.name": {
      "id": "Reactor.weavingPlant.name",
      "defaultMessage": "Weaving Plant"
  },
  "weavingPlant.description": {
      "id": "Reactor.weavingPlant.description",
      "defaultMessage": "Creates the most basic fabrics from fibers"
  },
  "weldingPlant.name": {
      "id": "Reactor.weldingPlant.name",
      "defaultMessage": "Welding Plant"
  },
  "weldingPlant.description": {
      "id": "Reactor.weldingPlant.description",
      "defaultMessage": "Creates a diverse set of metal products used in construction and device manufacturing."
  }
})
