import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { Recipe } from 'src/models/recipe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe])],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
