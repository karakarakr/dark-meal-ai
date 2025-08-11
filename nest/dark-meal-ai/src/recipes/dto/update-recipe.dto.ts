import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipeDto } from './create-recipe.dto';
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

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) { 
    @IsNotEmpty()
    title: string;
    
    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    imageURL: string;
    
    @IsNotEmpty()
    ingredients: Ingredient[];

    @IsNotEmpty()
    authorId: number;
}
