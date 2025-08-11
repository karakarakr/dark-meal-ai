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
  async create(
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
  async findAll() {
    return this.recipesService.findAll();
  }

  @Get('count')
  async getCount() {
    return this.recipesService.count();
  }

  @Get('chunk/:start/:end')
  async getChunk(
    @Param('start') start: number, 
    @Param('end') end: number
  ) {
    return this.recipesService.getChunk(start, end);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.recipesService.findOne(+id);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Patch(':id')
  async update(
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
  async remove(
    @Param('id') id: string, 
    @Req() req
  ) {
    if (!req.user) {
      throw new UnauthorizedException("You need to authorize first!");
    }

    return this.recipesService.remove(+id);
  }
}
