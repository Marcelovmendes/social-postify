import { ForbiddenException } from '@nestjs/common';

export class MediaLinkedErro extends ForbiddenException {
  constructor() {
    super('Media has been linked to a publication');
  }
}
