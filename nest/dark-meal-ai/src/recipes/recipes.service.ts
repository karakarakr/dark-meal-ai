import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from 'src/models/recipe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipesRepository: Repository<Recipe>
  ) {}

  async create(createRecipeDto: CreateRecipeDto) {
    const recipe = this.recipesRepository.create({
      ...createRecipeDto,
      createdAt: new Date(),
    });
    return await this.recipesRepository.save(recipe);
  }

  async findAll() {
    return await this.recipesRepository.find();
  }

  async findOne(id: number) {
    return await this.recipesRepository.findOne({ where: { id } });
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    await this.recipesRepository.update(id, updateRecipeDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.recipesRepository.delete(id);
  
    if (result.affected === 0) {
      throw new NotFoundException(`Recipe with id ${id} not found`);
    }
  
    return { message: `Recipe with id ${id} deleted successfully` };
  }
}
