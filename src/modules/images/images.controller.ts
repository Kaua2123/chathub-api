import {
  Controller,
  Get,
  Param,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from './multer-config';

@Controller('/addImages')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get('/:name')
  async getImageName() {}

  @Put('/addUserImage/:id')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async addUserImage(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.imagesService.addUserImage(id, file);
  }
}
