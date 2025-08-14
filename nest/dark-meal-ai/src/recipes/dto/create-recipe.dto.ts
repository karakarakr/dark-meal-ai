import { IsNotEmpty } from 'class-validator';

export interface CookingTime {
    hours: number,
    minutes: number
}

enum Unit {
    GRAM = 'g',
    KILOGRAM = 'kg',
    MILLILITER = 'ml',
    LITER = 'l',
    TEASPOON = 'tsp',
    TABLESPOON = 'tbsp',
    PIECE = 'pcs'
}

enum Difficulty {
    HARD = 'Hard',
    MEDIUM = 'Medium',
    EASY = 'Easy'
}

export interface Ingredient {
    name: string   
    amount: number   
    unit: Unit
}

export class CreateRecipeDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    imageURL: string;
    
    @IsNotEmpty()
    ingredients: Ingredient[];

    @IsNotEmpty()
    difficulty: Difficulty;

    @IsNotEmpty()
    cookingTime: CookingTime

    @IsNotEmpty()
    authorId: number;
}
