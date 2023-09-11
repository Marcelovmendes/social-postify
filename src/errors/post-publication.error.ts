import { HttpException, HttpStatus } from '@nestjs/common';

export class PostInPublicationError extends HttpException {
  private _postId: number;
  constructor(postId: number) {
    super(
      `Post with ID ${postId} is part of a publication and cannot be deleted`,
      HttpStatus.FORBIDDEN,
    );
    this._postId = postId;
  }
  get postId() {
    return this._postId;
  }
}
