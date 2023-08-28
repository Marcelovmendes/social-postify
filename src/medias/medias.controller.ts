import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MediasService } from './medias.service';
import { CreateMediaDto } from '../dto/create-media.dto';
import { UpdateMediaDto } from '../dto/update-media.dto';

@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  @Post()
  create(@Body() createMediaDto: CreateMediaDto) {
    return this.mediasService.createMedia(createMediaDto);
  }

  @Get()
  findAll() {
    return this.mediasService.getMedias();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediasService.getMediasById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediasService.updateMedia(+id, updateMediaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediasService.deleteMedia(+id);
  }
}
