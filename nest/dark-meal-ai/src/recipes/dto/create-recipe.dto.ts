import { IsNotEmpty } from 'class-validator';

enum Unit {
    GRAM = 'g',
    KILOGRAM = 'kg',
    MILLILITER = 'ml',
    LITER = 'l',
    TEASPOON = 'tsp',
    TABLESPOON = 'tbsp',
    PIECE = 'pcs'
}

export interface Ingredient {
    name: string   
    amount: number   
    unit: Unit
}

export class CreateRecipeDto {
    @IsNotEmpty()
    title: string;
    content: string;
    
    @IsNotEmpty()
    ingredients: Ingredient[];

    @IsNotEmpty()
    authorId: number;
}
