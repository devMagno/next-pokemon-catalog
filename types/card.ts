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

interface Resistance {
  type: string
  value: string
}

interface Ability {
  name: string
  text: string
  type: string
}

export interface CardData {
  id: string
  name: string
  subtypes: string[]
  types: string[]
  attacks: Attack[]
  weaknesses: Weakness[]
  resistances: Resistance[]
  number: string
  images: Images
  hp: string
  abilities: Ability[]
  flavorText: string
}
