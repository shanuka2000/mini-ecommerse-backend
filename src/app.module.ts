import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { UploadModule } from './image-upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ProductsModule,
    UploadModule,
    MongooseModule.forRoot(
      'mongodb+srv://shanukase:8Ejay0sufP6hTbOM@cluster0.yj3jrtg.mongodb.net/mini-ecommerce-db?retryWrites=true&w=majority',
    ),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
