import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExerciseCategoriesController } from './categories.controller';
import { ExerciseCategoriesService } from './categories.service';
import { ExerciseCategory, ExerciseCategorySchema } from './exercise-category.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ExerciseCategory.name, schema: ExerciseCategorySchema },
        ]),
    ],
    controllers: [ExerciseCategoriesController],
    providers: [ExerciseCategoriesService],
    exports: [ExerciseCategoriesService],
})
export class ExerciseCategoriesModule {}