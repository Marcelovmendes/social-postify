import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PostsRepository } from './posts.repositoy';

@Module({
  imports: [PrismaModule],
  providers: [PostsService, PostsRepository],
  exports : [PostsService]
})
export class PostsModule {}
