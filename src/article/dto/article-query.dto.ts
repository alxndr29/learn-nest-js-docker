import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ArticleQueryDto {
  @ApiPropertyOptional({description:"Cari data berdasarkan judul article"})
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({description:"Cari data berdasarkan categoryId article"})
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiPropertyOptional({description:"halaman page sekarang"})
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({description:"jumlah data per halaman"})
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({description:"Sort by", enum:['title','categoryId','createdAt']})
  @IsOptional()
  @IsIn(['title', 'createdAt'])
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({description:"Order by", enum:['asc','desc']})
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'desc';
}
