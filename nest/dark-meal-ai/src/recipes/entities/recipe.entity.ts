enum Unit {
    GRAM = 'g',
    KILOGRAM = 'kg',
    MILLILITER = 'ml',
    LITER = 'l',
    TEASPOON = 'tsp',
    TABLESPOON = 'tbsp',
    PIECE = 'pcs'
}

export enum Difficulty {
    HARD = 'Hard',
    MEDIUM = 'Medium',
    EASY = 'Easy'
}

export interface CookingTime {
    hours: number
    minutes: number
}

export interface Ingredient {
    name: string   
    amount: number   
    unit: Unit
}

export class Recipe {
    id: string   
    title: string   
    content: string        // HTML or Markdown   
    ingredients: Ingredient[]  // Stored as JSON   
    difficulty: Difficulty
    cookingTime: CookingTime
    authorId: string   
    createdAt: Date 
}
