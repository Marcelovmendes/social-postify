import { Optional } from "@nestjs/common";
import { IsBooleanString, IsDateString, IsOptional } from "class-validator";

export class QueryFilter {
   @IsOptional()
    published: string;
    @IsOptional()
     after: Date;
  }