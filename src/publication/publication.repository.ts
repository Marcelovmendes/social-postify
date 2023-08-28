import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PublicationRepository {

    constructor(private readonly prisma: PrismaService) {}
    
    createPublication(body: any) {
        return this.prisma.publication.create({ data: body });
    }
    getPublications (published?: boolean, after?:Date){
        const date = new Date()
        return this.prisma.publication.findMany(
        {
          where: {
            date: {
              lt: published ? date : undefined,
              gt: published === false ? date : undefined
            },
            AND: {
              date: {
                gt: after ? new Date(after) : undefined,
              }
            }
          }
        }
        );
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
    async getPublicationStatus(id: number) {
        const publication = await this.prisma.publication.findUnique({ where: { id } });
     
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
            mediaId
          },
        });
          
      }
}
