import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Routine } from './routine.schema';
import { CreateRoutineDto, UpdateRoutineDto } from './dto/routine.dto';

@Injectable()
export class RoutinesService {
    constructor(@InjectModel(Routine.name) private routineModel: Model<Routine>) {}

    async create(createRoutineDto: CreateRoutineDto): Promise<Routine> {
        const totalDuration = createRoutineDto.exercises.reduce(
            (sum, ex) => sum + ex.duration,
            0
        );

        const routine = new this.routineModel({
            ...createRoutineDto,
            totalDuration,
        });
        return routine.save();
    }

    async findAll(): Promise<Routine[]> {
        return this.routineModel.find().exec();
    }

    async findOne(id: string): Promise<Routine> {
        const routine = await this.routineModel.findById(id).exec();
        if (!routine) {
            throw new NotFoundException(`Routine with ID ${id} not found`);
        }
        return routine;
    }

    async update(id: string, updateRoutineDto: UpdateRoutineDto): Promise<Routine> {
        const updateData: any = { ...updateRoutineDto };

        if (updateRoutineDto.exercises) {
            updateData.totalDuration = updateRoutineDto.exercises.reduce(
                (sum, ex) => sum + ex.duration,
                0
            );
        }

        const routine = await this.routineModel
            .findByIdAndUpdate(id, updateData, { new: true })
            .exec();

        if (!routine) {
            throw new NotFoundException(`Routine with ID ${id} not found`);
        }
        return routine;
    }

    async remove(id: string): Promise<void> {
        const result = await this.routineModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Routine with ID ${id} not found`);
        }
    }
}