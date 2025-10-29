import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Exercise extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ type: Types.ObjectId, ref: 'ExerciseCategory', required: true })
    categoryId: Types.ObjectId;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Tag' }], default: [] })
    tagIds: Types.ObjectId[];

    @Prop({ required: true })
    duration: number; // in seconds

    @Prop()
    description?: string;

    @Prop()
    videoUrl?: string;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);