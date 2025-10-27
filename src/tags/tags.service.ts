import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag } from './tag.schema';
import { CreateTagDto, UpdateTagDto } from './dto/tag.dto';

@Injectable()
export class TagsService {
    constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) {}

    async create(createTagDto: CreateTagDto): Promise<Tag> {
        const tag = new this.tagModel(createTagDto);
        return tag.save();
    }

    async findAll(): Promise<Tag[]> {
        return this.tagModel.find().exec();
    }

    async findOne(id: string): Promise<Tag> {
        const tag = await this.tagModel.findById(id).exec();
        if (!tag) {
            throw new NotFoundException(`Tag with ID ${id} not found`);
        }
        return tag;
    }

    async update(id: string, updateTagDto: UpdateTagDto): Promise<Tag> {
        const tag = await this.tagModel
            .findByIdAndUpdate(id, updateTagDto, { new: true })
            .exec();

        if (!tag) {
            throw new NotFoundException(`Tag with ID ${id} not found`);
        }
        return tag;
    }

    async remove(id: string): Promise<void> {
        const result = await this.tagModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Tag with ID ${id} not found`);
        }
    }
}