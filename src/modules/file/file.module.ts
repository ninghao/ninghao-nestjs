import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads'
    })
  ],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule { }
