import { Module } from '@nestjs/common';
import { MediasService } from './medias.service';

@Module({
  providers: [MediasService]
})
export class MediasModule {}
