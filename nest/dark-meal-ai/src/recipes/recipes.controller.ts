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
  Query
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

  @Get('search')
  async searchByWord(
    @Query('q') q: string
  ) {
    return this.recipesService.searchByWord(q);
  }

  @Get('count')
  async getCount(
    @Query('q') q: string,
    @Query() otherQueries: Record<string, any>
  ) {
    return this.recipesService.count(q, otherQueries);
  }

  @Get('chunk')
  async getChunk(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query() query: Record<string, any>
  ) {
    return this.recipesService.getChunk(page, limit, query);
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
