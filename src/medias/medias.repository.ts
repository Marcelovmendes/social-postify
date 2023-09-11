import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMediaDto } from '../dto/create-media.dto';
import { UpdateMediaDto } from '../dto/update-media.dto';

@Injectable()
export class MediasRepository {
  constructor(private readonly prisma: PrismaService) {}

  createMedia(body: CreateMediaDto) {
    const { title, username } = body;
    return this.prisma.medias.create({ data: { title, username } });
  }
  getMedias() {
    return this.prisma.medias.findMany();
  }
  getMediasById(id: number) {
    return this.prisma.medias.findUnique({ where: { id: id } });
  }
  updateMedia(id: number, body: UpdateMediaDto) {
    return this.prisma.medias.update({ where: { id: id }, data: body });
  }
  deleteMedia(id: number) {
    return this.prisma.medias.delete({ where: { id: id } });
  }
  existMidia(title: string, username: string) {
    return this.prisma.medias.findFirst({
      where: { title: title, username: username },
    });
  }
}
