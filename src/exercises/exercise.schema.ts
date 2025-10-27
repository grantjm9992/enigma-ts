import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Exercise extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    category: string;

    @Prop({ type: [String], default: [] })
    tags: string[];

    @Prop({ required: true })
    duration: number; // in seconds

    @Prop()
    description?: string;

    @Prop()
    videoUrl?: string;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);