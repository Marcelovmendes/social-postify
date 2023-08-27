import { Injectable } from '@nestjs/common';
import { MediasRepository } from './medias.repository';

@Injectable()
export class MediasService {
  constructor(private readonly repository: MediasRepository) {}

  async createMedia(body: any) {
    return await this.repository.createMedia(body);
  }
  async getMedias() {
    return await this.repository.getMedias();
  }
  async getMediasById(id: number) {
    return await this.repository.getMediasById(id);
  }
  async updateMedia(id: number, body: any) {
    return await this.repository.updateMedia(id, body);
  }
  async deleteMedia(id: number) {
    return await this.repository.deleteMedia(id);
  }
}
