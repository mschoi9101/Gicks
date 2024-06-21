import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContentsController } from './contents/contents.controller';
import { ContentsService } from './contents/contents.service';
import { ContentsModule } from './contents/contents.module';

@Module({
  imports: [ContentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
