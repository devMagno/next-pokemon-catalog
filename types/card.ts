interface Attack {
  name: string
  cost: string[]
  convertedEnergyCost: number
  damage: string
  text: string
}

interface Images {
  small: string
  large: string
}

interface Weakness {
  type: string
  value: string
}

export interface CardData {
  id: string
  name: string
  supertype: string
  subtypes: string[]
  types: string[]
  evolvesTo: string[]
  attacks: Attack[]
  weaknesses: Weakness[]
  retreatCost: string[]
  number: string
  images: Images
  flavorText: string
}
