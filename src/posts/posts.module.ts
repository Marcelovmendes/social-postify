import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PostsRepository } from './posts.repositoy';
import { PublicationModule } from '../publication/publication.module';
import { PublicationRepository } from '../publication/publication.repository';
import { PostsController } from './posts.controller';


@Module({
  controllers: [PostsController],
  imports: [PrismaModule,PublicationModule],
  providers: [PostsService, PostsRepository, PublicationRepository],
  exports : [PostsService]
})
export class PostsModule {}
