import { Module, forwardRef } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationRepository } from './publication.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { PublicationController } from './publication.controller';
import { MediasModule } from '../medias/medias.module';
import { PostsModule } from '../posts/posts.module';
import { MediasRepository } from '../medias/medias.repository';
import { PostsRepository } from '../posts/posts.repositoy';

@Module({
  controllers: [PublicationController],
  imports: [PrismaModule],
  providers: [
    PublicationService,
    PublicationRepository,
    MediasRepository,
    PostsRepository,
  ],
  exports: [PublicationService, PublicationRepository],
})
export class PublicationModule {}
