import { IsBooleanString, IsDateString } from "class-validator";

export class QueryFilter {
    @IsBooleanString()
    published: string;
 
    @IsDateString()
     after: Date;
  }