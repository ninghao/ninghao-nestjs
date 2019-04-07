import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    PostModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
