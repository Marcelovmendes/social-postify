import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MediasRepository {
  constructor(private readonly prisma: PrismaService) {}

  createMedia(body: any) {
    return this.prisma.medias.create({ data: body });
  }
  getMedias (){
    return this.prisma.medias.findMany();
  }
  getMediasById(id: number){
    return this.prisma.medias.findUnique({where: {id: id}});
  }
  updateMedia(id: number, body: any){
    return this.prisma.medias.update({where: {id: id}, data: body});
  }
  deleteMedia(id: number){
    return this.prisma.medias.delete({where: {id: id}});
  }
}
