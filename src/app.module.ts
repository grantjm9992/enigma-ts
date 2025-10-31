import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ExercisesModule } from './exercises/exercises.module';
import { RoutinesModule } from './routines/routines.module';
import { SessionsModule } from './sessions/sessions.module';
import { TagsModule } from './tags/tags.module';
import { ExerciseCategoriesModule } from './exercise-categories/categories.module';
import {AuthModule} from "./auth/auth.module";

@Module({
  imports: [
    MongooseModule.forRoot(
        process.env.MONGODB_URI ||
        'mongodb://admin:password123@localhost:27017/nestjs_db?authSource=admin'
    ),
    UsersModule,
    ExercisesModule,
    RoutinesModule,
    SessionsModule,
    TagsModule,
    ExerciseCategoriesModule,
    AuthModule,
  ],
})
export class AppModule {}