import { IsDateString, IsInt, IsNotEmpty, isPositive } from "class-validator"

export class CreatePublicationDto {
    @IsInt()
    @IsNotEmpty()
    mediaId: number;

    @IsInt()
    @IsNotEmpty()
    postId: number;

    @IsDateString()
    @IsNotEmpty()
    date: Date
}
