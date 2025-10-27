import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ExerciseCategory extends Document {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop()
    description?: string;
}

export const ExerciseCategorySchema = SchemaFactory.createForClass(ExerciseCategory);