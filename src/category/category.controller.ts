import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
  HttpStatus, Put, UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { FindOneParams } from './dto/find-one.params';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/decolators/roles.decolator';
import { Role } from '../auth/enum/role.enum';


@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService
  ){}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto):Promise<Category> {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll():Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: FindOneParams): Promise<Category> {
    return await this.findOrFail(params.id)
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put("/:id")
  async update(@Param() params: FindOneParams, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOrFail(params.id)
    return await this.categoryService.update(category, updateCategoryDto)
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() params: FindOneParams) {
    const category = await this.findOrFail(params.id)
    await this.categoryService.remove(category)
  }

  private async findOrFail(id: string): Promise<Category> {
    const category = await this.categoryService.findOne(id)
    if (!category) {
      throw new NotFoundException()
    }
    return category
  }
}
