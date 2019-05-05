import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { FileDto } from './file.dto';

@Controller('files')
export class FileController {
  constructor(
    private readonly fileService: FileService
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async store(
    @UploadedFile() data: FileDto
  ) {
    return await this.fileService.store(data);
  }
}
