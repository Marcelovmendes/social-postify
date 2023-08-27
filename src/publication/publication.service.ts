import { Injectable } from '@nestjs/common';
import { PublicationRepository } from './publication.repository';

@Injectable()
export class PublicationService {

    constructor(private readonly  repository: PublicationRepository) {}

    async createPublication(body: any) {
        return await this.repository.createPublication(body);
    }
    async getPublications (){
        return await this.repository.getPublications();
    }
    async getPublicationsById(id: number){
        return await this.repository.getPublicationsById(id);
    }
    async updatePublication(id: number, body: any){
        return await this.repository.updatePublication(id, body);
    }
    async deletePublication(id: number){
        return await this.repository.deletePublication(id);
    }
}
