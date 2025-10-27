import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exercise } from './exercise.schema';
import { CreateExerciseDto, UpdateExerciseDto } from './dto/exercise.dto';

@Injectable()
export class ExercisesService {
    constructor(@InjectModel(Exercise.name) private exerciseModel: Model<Exercise>) {}

    async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
        const exercise = new this.exerciseModel(createExerciseDto);
        return exercise.save();
    }

    async findAll(): Promise<Exercise[]> {
        return this.exerciseModel.find().exec();
    }

    async findOne(id: string): Promise<Exercise> {
        const exercise = await this.exerciseModel.findById(id).exec();
        if (!exercise) {
            throw new NotFoundException(`Exercise with ID ${id} not found`);
        }
        return exercise;
    }

    async findByCategory(category: string): Promise<Exercise[]> {
        return this.exerciseModel.find({ category }).exec();
    }

    async findByTags(tags: string[]): Promise<Exercise[]> {
        return this.exerciseModel.find({ tags: { $in: tags } }).exec();
    }

    async update(id: string, updateExerciseDto: UpdateExerciseDto): Promise<Exercise> {
        const exercise = await this.exerciseModel
            .findByIdAndUpdate(id, updateExerciseDto, { new: true })
            .exec();

        if (!exercise) {
            throw new NotFoundException(`Exercise with ID ${id} not found`);
        }
        return exercise;
    }

    async remove(id: string): Promise<void> {
        const result = await this.exerciseModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Exercise with ID ${id} not found`);
        }
    }
}