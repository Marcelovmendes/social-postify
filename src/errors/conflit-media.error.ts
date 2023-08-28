import { ConflictException } from '@nestjs/common';

export class MediaConflictError extends ConflictException {
  constructor() {
    super('Combination of title and username already exists');
  }
}