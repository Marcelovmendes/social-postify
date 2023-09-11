import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repositoy';
import { MissingFieldsError } from '../errors/missing-fields.error';
import { NotFoundPostError } from '../errors/not-found-post.error';
import { PublicationRepository } from '../publication/publication.repository';
import { PostInPublicationError } from '../errors/post-publication.error';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly repository: PostsRepository,
    private readonly publicationRepository: PublicationRepository,
  ) {}

  async createPost(body: CreatePostDto) {
    const requireFields = ['title', 'text'];
    const missingFields = requireFields.filter((field) => !body[field]);
    if (missingFields.length) throw new MissingFieldsError(missingFields);

    return await this.repository.createPost(body);
  }
  async getPosts() {
    const result = await this.repository.getPosts();
    if (!result || !result.length) return [];

    return result;
  }
  async getPostsById(id: number) {
    const result = await this.repository.getPostsById(id);
    if (!result) throw new NotFoundPostError(id);

    return result;
  }
  async updatePost(id: number, body: UpdatePostDto) {
    const post = await this.repository.getPostsById(id);
    if (!post) throw new NotFoundPostError(id);
    const result = await this.repository.updatePost(id, body);
    return result;
  }
  async deletePost(id: number) {
    const result = await this.repository.getPostsById(id);
    if (!result) throw new NotFoundPostError(id);

    const publicationExists =
      await this.publicationRepository.getPublicationByPostId(id);
    if (publicationExists) throw new PostInPublicationError(id);

    return await this.repository.deletePost(id);
  }
}
