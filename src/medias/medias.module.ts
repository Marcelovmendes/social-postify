import { Module } from '@nestjs/common';
import { MediasService } from './medias.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MediasRepository } from './medias.repository';
import { MediasController } from './medias.controller';
import { PublicationModule } from '../publication/publication.module';
import { PublicationRepository } from '../publication/publication.repository';

@Module({
  controllers: [MediasController],
  imports: [PrismaModule, PublicationModule],
  providers: [MediasService, MediasRepository, PublicationRepository],
  exports: [MediasService, MediasRepository],
})
export class MediasModule {}
