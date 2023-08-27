import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationRepository } from './publication.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { PublicationController } from './publication.controller';


@Module({
  imports: [PrismaModule ],
  providers: [PublicationService, PublicationRepository, ],
  exports : [PublicationService],
  controllers: [PublicationController]
})
export class PublicationModule {}
