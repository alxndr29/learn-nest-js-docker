import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private CategoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.CategoryRepository.save(createCategoryDto);
  }

  async findAll(): Promise<Category[]> {
    return await this.CategoryRepository.find();
  }

  async findOne(id: string): Promise<Category | null> {
    return await this.CategoryRepository.findOne({
      where: { id },
      relations: [
        'articles',
        'articles.user',
        'articles.articleTags',
        'articles.articleTags.tag',
      ],
      select: {
        id: true,
        name: true,
        articles: {
          id: true,
          title: true,
          content: true,
          status: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          user: {
            name: true,
            email: true,
          },
          articleTags: {
            id: true,
            tag: {
              id: true,
              name: true,
            },
          },
        },
      },
    });
  }

  async update(
    category: Category,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    Object.assign(category, updateCategoryDto);
    return await this.CategoryRepository.save(category);
  }

  async remove(categoryData: Category): Promise<void> {
    await this.CategoryRepository.delete(categoryData.id);
  }
}
