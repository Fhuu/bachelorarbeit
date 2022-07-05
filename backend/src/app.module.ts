import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthMiddleware } from './auth.middleware';
import { TaskModule } from './task/task.module';
import { NoteModule } from './note/note.module';

@Module({
  imports: [
    UserModule, 
    MongooseModule.forRoot('mongodb://root:password@database/ba?authSource=admin'),
    TaskModule,
    NoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .exclude('/api/v1/user/all', '/api/v1/user/authn', {path: '/api/v1/user', method: RequestMethod.POST})
    .forRoutes('/v1/*');
  }
}
