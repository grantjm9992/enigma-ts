import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExerciseCategory } from './exercise-category.schema';
import { CreateExerciseCategoryDto, UpdateExerciseCategoryDto } from './dto/category.dto';

@Injectable()
export class ExerciseCategoriesService {
    constructor(
        @InjectModel(ExerciseCategory.name) private categoryModel: Model<ExerciseCategory>
    ) {}

    async create(createCategoryDto: CreateExerciseCategoryDto): Promise<ExerciseCategory> {
        const category = new this.categoryModel(createCategoryDto);
        return category.save();
    }

    async findAll(): Promise<ExerciseCategory[]> {
        return this.categoryModel.find().exec();
    }

    async findOne(id: string): Promise<ExerciseCategory> {
        const category = await this.categoryModel.findById(id).exec();
        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
    }

    async update(id: string, updateCategoryDto: UpdateExerciseCategoryDto): Promise<ExerciseCategory> {
        const category = await this.categoryModel
            .findByIdAndUpdate(id, updateCategoryDto, { new: true })
            .exec();

        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
    }

    async remove(id: string): Promise<void> {
        const result = await this.categoryModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
    }
}