import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MediasModule } from './medias/medias.module';
import { PostsModule } from './posts/posts.module';
import { PublicationModule } from './publication/publication.module';
import { PostsController } from './pots/posts.controller';
import { MediasModule } from './medias.module';
import { PublicationModule } from './publication.module';
import { PostsModule } from './posts.module';
import { PublicationModule } from './publication.module';
import { MediasModule } from './medias.module';
import { PostsModule } from './posts.module';
import { PostsModule } from './posts.module';

@Module({
  imports: [PrismaModule, MediasModule, PostsModule, PublicationModule],
  controllers: [AppController, PostsController],
  providers: [AppService],
})
export class AppModule {}
