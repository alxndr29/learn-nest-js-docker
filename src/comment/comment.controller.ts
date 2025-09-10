import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CommentService } from './comment.service';
import { CreateUpdateCommentDto } from './dto/create-update-comment.dto';

@Controller('comment')
@UseGuards(AuthGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async updateOrCreateComment(
    @Request() req,
    @Body() createUpdateCommentDto: CreateUpdateCommentDto,
  ): Promise<{ message: string }> {
    return await this.commentService.updateOrCreateComment(
      req.user.id,
      createUpdateCommentDto,
    );
  }

  @Get('/:articleId')
  async isValidComment(
    @Request() req,
    @Param('articleId') articleId: string,
  ): Promise<{ status: boolean; id?: string }> {
    return this.commentService.isValidComment(req.user.id, articleId);
  }
}
