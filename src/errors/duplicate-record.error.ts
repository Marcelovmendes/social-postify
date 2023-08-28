import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateRecordError extends HttpException {
  constructor() {
    super('Record with the same combination already exists', HttpStatus.CONFLICT);
  }  
}