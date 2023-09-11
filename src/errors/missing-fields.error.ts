import { HttpException, HttpStatus } from '@nestjs/common';

export class MissingFieldsError extends HttpException {
  private _fields: string[];
  constructor(fields: string[]) {
    super(`Missing required field: ${fields}`, HttpStatus.BAD_REQUEST);
    this._fields = fields;
  }

  get fields() {
    return this._fields;
  }
}
