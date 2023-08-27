import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MediasModule } from './medias/medias.module';
import { PostsModule } from './posts/posts.module';
import { PublicationModule } from './publication/publication.module';

@Module({
  imports: [PrismaModule, MediasModule, PostsModule, PublicationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
