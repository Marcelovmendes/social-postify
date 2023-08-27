import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from '../dto/create-publication.dto';
import { UpdatePublicationDto } from '../dto/update-publication.dto';

@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Post()
  create(@Body() createPublicationDto: CreatePublicationDto) {
    return this.publicationService.createPublication(createPublicationDto);
  }

  @Get()
  findAll() {
    return this.publicationService.getPublications();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicationService.getPublicationsById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublicationDto: UpdatePublicationDto) {
    return this.publicationService.updatePublication(+id, updatePublicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicationService.deletePublication(+id);
  }
}
