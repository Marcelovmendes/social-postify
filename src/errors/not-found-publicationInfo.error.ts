import { HttpException, HttpStatus } from '@nestjs/common';

export class PublicationInfoNotFoundError extends HttpException {
  private _mediaId: number;
  private _postId: number;
  constructor(mediaId: number, postId: number) {
    super(
      `Publication not found for mediaId: ${mediaId} and postId: ${postId}`,
      HttpStatus.NOT_FOUND,
    );
    this._mediaId = mediaId;
    this._postId = postId;
  }

  get mediaId() {
    return this._mediaId;
  }
  get postId() {
    return this._postId;
  }
}
