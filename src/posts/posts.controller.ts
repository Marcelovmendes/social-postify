import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.getPosts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.getPostsById(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdatePostDto) {
    return this.postsService.updatePost(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.deletePost(+id);
  }
}
