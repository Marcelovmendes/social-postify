import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';

@Module({
  providers: [PublicationService]
})
export class PublicationModule {}
