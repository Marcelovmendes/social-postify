import { Injectable } from '@nestjs/common';
import { PublicationRepository } from './publication.repository';
import { MissingFieldsError } from '../errors/missing-fields.error';
import { CreatePublicationDto } from '../dto/create-publication.dto';
import { PublicationInfoNotFoundError } from '../errors/not-found-publicationInfo.error';
import { NotFoundPublicationError } from '../errors/not-found-publication';
import { UpdatePublicationDto } from '../dto/update-publication.dto';
import { PublicationForbiddenError } from '../errors/publication-forbidden.error';

@Injectable()
export class PublicationService {
  constructor(private readonly repository: PublicationRepository) {}

  async createPublication(body: CreatePublicationDto) {
    const { mediaId, postId } = body;
    const requireFields = ['mediaId', 'postId', 'date'];
    const missingFields = requireFields.filter((field) => !body[field]);
    if (missingFields.length) throw new MissingFieldsError(missingFields);

    const result = await this.repository.createPublication(body);
    if (!result) throw new PublicationInfoNotFoundError(mediaId, postId);
    return result;
  }
  async getPublications(published?: boolean, after?: Date) {
    const result = await this.repository.getPublications( published, after);
    if (!result || !result.length) return [];

    return result;
  }
  async getPublicationsById(id: number) {
    const result = await this.repository.getPublicationsById(id);
    if (!result) throw new NotFoundPublicationError(id);

    return result;
  }
  async updatePublication(id: number, body: UpdatePublicationDto) {
    const today = new Date(Date.now() );
    const { mediaId, postId } = body;

    const publication = await this.repository.getPublicationByPostId(id);
    if (publication.date < today) throw new PublicationForbiddenError(id);

    const existingPublication =
      await this.repository.findPublicationByMediaAndPostId(mediaId, postId);
    if (!existingPublication)
      throw new PublicationInfoNotFoundError(mediaId, postId);

    return await this.repository.updatePublication(id, body);
  }
  async deletePublication(id: number) {
    const result = await this.repository.getPublicationsById(id);
    if (!result) throw new NotFoundPublicationError(id);

    return await this.repository.deletePublication(id);
  }
}
