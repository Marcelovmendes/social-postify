import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from '../dto/create-publication.dto';
import { UpdatePublicationDto } from '../dto/update-publication.dto';
import { QueryFilter } from '../dto/filter-query.dto';

@Controller('publications')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Post()
  create(@Body() createPublicationDto: CreatePublicationDto) {
    return this.publicationService.createPublication(createPublicationDto);
  }

  @Get()
  findAll(@Query() query?: QueryFilter) {
    const { published, after } = query;
    const boolean = published ? published === 'true' : undefined;
    return this.publicationService.getPublications(boolean, after);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicationService.getPublicationsById(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePublicationDto: UpdatePublicationDto,
  ) {
    return this.publicationService.updatePublication(+id, updatePublicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicationService.deletePublication(+id);
  }
}
