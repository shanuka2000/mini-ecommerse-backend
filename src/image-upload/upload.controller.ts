import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('file', null, {
      storage: diskStorage({
        destination: 'public/img',
        filename: (req, file, cb) => {
          const fileNameSplit = file.originalname.split('.');
          const fileExt = fileNameSplit[fileNameSplit.length - 1];
          cb(null, `${Date.now()}.${fileExt}`);
        },
      }),
    }),
  )
  async uploadFiles(@UploadedFiles() file: Array<Express.Multer.File>) {
    return file;
  }
}
