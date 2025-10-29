import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

class EmbeddedExercise {
    @Prop({ type: Types.ObjectId, required: true })
    exerciseId: Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    duration: number; // in seconds - can be modified per routine

    @Prop()
    description?: string;

    @Prop()
    order?: number; // Order in the routine
}

@Schema({ timestamps: true })
export class Routine extends Document {
    @Prop({ required: true })
    name: string;

    @Prop()
    description?: string;

    @Prop({ type: [EmbeddedExercise], default: [] })
    exercises: EmbeddedExercise[];

    @Prop()
    totalDuration?: number; // Total duration in seconds (calculated)
}

export const RoutineSchema = SchemaFactory.createForClass(Routine);