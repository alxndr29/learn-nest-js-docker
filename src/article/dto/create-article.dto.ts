import { ArtileStatus } from "../interface/article.interface";
import { IsNotEmpty, IsString, IsEnum } from "class-validator";
export class createArticleDto {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    content: string

    @IsNotEmpty()
    @IsEnum(ArtileStatus)
    status: ArtileStatus
}