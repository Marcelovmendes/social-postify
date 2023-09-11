import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from '../dto/create-post.dto';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  createPost(body: CreatePostDto) {
    return this.prisma.posts.create({ data: body });
  }
  getPosts() {
    return this.prisma.posts.findMany();
  }
  getPostsById(id: number) {
    return this.prisma.posts.findFirst({ where: { id: id } });
  }
  updatePost(id: number, body: any) {
    return this.prisma.posts.update({ where: { id: id }, data: body });
  }
  deletePost(id: number) {
    return this.prisma.posts.delete({ where: { id: id } });
  }
}
