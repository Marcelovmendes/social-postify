import { Injectable } from '@nestjs/common';
import { MediasRepository } from './medias.repository';
import { MissingFieldsError } from '../errors/missing-fields.error';
import { DuplicateRecordError } from '../errors/duplicate-record.error';
import { NotFoundMediaError } from '../errors/not-found-media';
import { MediaConflictError } from '../errors/conflit-media.error';
import { PublicationRepository } from '../publication/publication.repository';
import { MediaLinkedErro } from '../errors/media-linked.error';

@Injectable()
export class MediasService {
  constructor(
    private readonly repository: MediasRepository,
    private readonly publicationRepository: PublicationRepository,
  ) {}

  async createMedia(body: any) {
    const { title, username } = body;
    if (!title) throw new MissingFieldsError(['title']);
    if (!username) throw new MissingFieldsError(['username']);
    const mediaExists = await this.repository.existMidia(title, username);
    if (mediaExists) throw new DuplicateRecordError();

    return await this.repository.createMedia(body);
  }
  async getMedias() {
    const result = await this.repository.getMedias();
    if (!result || !result.length) return [];
  }
  async getMediasById(id: number) {
    const result = await this.repository.getMediasById(id);
    if (!result) throw new NotFoundMediaError(id);

    return result;
  }
  async updateMedia(id: number, body: any) {
    const { title, username } = body;

    const existMidia = await this.repository.existMidia(title, username);
    if (existMidia && existMidia.id !== id) throw new MediaConflictError();

    const result = await this.repository.updateMedia(id, body);
    if (!result) throw new NotFoundMediaError(id);

    return result;
  }
  async deleteMedia(id: number) {
    const isLinkedTopublication =
      await this.publicationRepository.findIfIsPublished(id);
    if (isLinkedTopublication) throw new MediaLinkedErro();

    const result = await this.repository.deleteMedia(id);
    if (!result) throw new NotFoundMediaError(id);

    return result;
  }
}
