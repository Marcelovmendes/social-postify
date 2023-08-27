import { Module } from '@nestjs/common';
import { MediasService } from './medias.service';
import { MediasController } from './medias.controller';

@Module({
  providers: [MediasService],
  controllers: [MediasController]
})
export class MediasModule {}
