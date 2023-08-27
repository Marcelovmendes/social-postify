import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repositoy';

@Injectable()
export class PostsService {
  constructor(private readonly repository: PostsRepository) {}

  async createPost(body: any) {
    return await this.repository.createPost(body);
  }
  async getPosts() {
    return await this.repository.getPosts();
  }
  async getPostsById(id: number) {
    return await this.repository.getPostsById(id);
  }
  async updatePost(id: number, body: any) {
    return await this.repository.updatePost(id, body);
  }
  async deletePost(id: number) {
    return await this.repository.deletePost(id);
  }
}
