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
        return this.exerciseModel
            .find()
            .populate('categoryId', 'name description')
            .populate('tagIds', 'name color')
            .exec();
    }

    async findOne(id: string): Promise<Exercise> {
        const exercise = await this.exerciseModel
            .findById(id)
            .populate('categoryId', 'name description')
            .populate('tagIds', 'name color')
            .exec();

        if (!exercise) {
            throw new NotFoundException(`Exercise with ID ${id} not found`);
        }
        return exercise;
    }

    async findByCategory(categoryId: string): Promise<Exercise[]> {
        return this.exerciseModel
            .find({ categoryId })
            .populate('categoryId', 'name description')
            .populate('tagIds', 'name color')
            .exec();
    }

    async findByTags(tagIds: string[]): Promise<Exercise[]> {
        return this.exerciseModel
            .find({ tagIds: { $in: tagIds } })
            .populate('categoryId', 'name description')
            .populate('tagIds', 'name color')
            .exec();
    }

    async update(id: string, updateExerciseDto: UpdateExerciseDto): Promise<Exercise> {
        const exercise = await this.exerciseModel
            .findByIdAndUpdate(id, updateExerciseDto, { new: true })
            .populate('categoryId', 'name description')
            .populate('tagIds', 'name color')
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