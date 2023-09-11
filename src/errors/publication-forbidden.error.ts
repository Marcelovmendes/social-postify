import { HttpException, HttpStatus } from '@nestjs/common';

export class PublicationForbiddenError extends HttpException {
  private _id: number;
  constructor(id: number) {
    super(
      `Publication with ID ${id} has already been published and cannot be updated.`,
      HttpStatus.FORBIDDEN,
    );
  }
  get id() {
    return this._id;
  }
}
