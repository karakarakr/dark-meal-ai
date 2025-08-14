import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from 'src/models/recipe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';

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

  async searchByWord(q: string) {
    console.log(q);
    return await this.recipesRepository.find({
      where: [
        {title: ILike(`%${q}%`)},
        {content: ILike(`%${q}%`)},
      ]
    });
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

  async count(q: string, otherQueries: any): Promise<number> {
    if (otherQueries.userId) {
      return this.recipesRepository.count({
        where: [
          {authorId: otherQueries.userId}
        ] 
      });
    }
    
    if (q) {
      return this.recipesRepository.count({
        where: [
          {title: ILike(`%${q}%`)},
          {content: ILike(`%${q}%`)},
        ] 
      });
    }
    return this.recipesRepository.count();
  }

  async getChunk(page: number, limit: number, otherQuery: any) {
    const skip = (page - 1) * limit;
    // const requests = [];

    if (otherQuery.search) {
      return this.recipesRepository.find({
        where: [
          {title: ILike(`%${otherQuery.search}%`)},
          {content: ILike(`%${otherQuery.search}%`)},
        ],
        skip: skip,
        take: limit,
        order: { createdAt: 'DESC' }
      });
    }

    if (otherQuery.userId) {
      return await this.recipesRepository.find({
        where: [
          {authorId: otherQuery.userId}
        ],
        skip: skip,
        take: limit,
        order: { createdAt: 'DESC' }
      });
    }

    return this.recipesRepository.find({
      skip: skip,
      take: limit,
      order: { createdAt: 'DESC' }
    });
  }
}
