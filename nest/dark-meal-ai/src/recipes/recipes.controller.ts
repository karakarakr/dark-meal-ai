// MAKE RELATIONSHIP LOGIC
// TO CREATE MEALS WITH ONE-TO-MANY RE


import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards, 
  Req, 
  UnauthorizedException,
  ForbiddenException
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { OptionalJwtAuthGuard } from 'src/auth/optional-jwt.guard';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @UseGuards(OptionalJwtAuthGuard)
  @Post()
  create(
    @Req() req,
    @Body() createRecipeDto: CreateRecipeDto
  ) {

    if (!req.user) {
      throw new UnauthorizedException("You need to authorize first!");
    }

    return this.recipesService.create({
      ...createRecipeDto,
      authorId: req.user.id,
    });
  }

  @Get()
  findAll() {
    return this.recipesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(+id);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Req() req,
    @Body() updateRecipeDto: UpdateRecipeDto
  ) {

    if (!req.user) {
      throw new UnauthorizedException("You need to authorize first!");
    }

    return this.recipesService.update(+id, updateRecipeDto);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id') id: string, 
    @Req() req
  ) {

    if (!req.user) {
      throw new UnauthorizedException("You need to authorize first!");
    }

    return this.recipesService.remove(+id);
  }
}
