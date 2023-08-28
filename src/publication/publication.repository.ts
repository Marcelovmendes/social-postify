import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PublicationRepository {

    constructor(private readonly prisma: PrismaService) {}
    
    createPublication(body: any) {
        return this.prisma.publication.create({ data: body });
    }
    getPublications (){
        return this.prisma.publication.findMany();
    }
    getPublicationsById(id: number){
        return this.prisma.publication.findUnique({where: {id: id}});
    }
    updatePublication(id: number, body: any){
        return this.prisma.publication.update({where: {id: id}, data: body});
    }
    deletePublication(id: number){
        return this.prisma.publication.delete({where: {id: id}});
    }
    getPublicationByPostId(postId: number){
        return this.prisma.publication.findFirst({where: {postId: postId}});
    }
    async getPublicationStatus(id: number): Promise<boolean> {
        const publication = await this.prisma.publication.findUnique({ where: { id } });
        return publication?.published;
      }
      async findPublicationByMediaAndPostId(mediaId: number, postId: number) {
        return this.prisma.publication.findFirst({
          where: {
            mediaId,
            postId,
          },
        });
      }
      async findIfIsPublished(mediaId: number) {
        return this.prisma.publication.findFirst({
          where: {
            mediaId,
            published: true,
          },
        });
          
      }
}
