import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

class EmbeddedExercise {
    @Prop({ type: Types.ObjectId, required: true })
    exerciseId: Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    duration: number;

    @Prop()
    description?: string;

    @Prop()
    order?: number;
}

class EmbeddedRoutine {
    @Prop({ type: Types.ObjectId, required: true })
    routineId: Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop()
    description?: string;

    @Prop({ type: [EmbeddedExercise], default: [] })
    exercises: EmbeddedExercise[];

    @Prop()
    order?: number; // Order in the session
}

@Schema({ timestamps: true })
export class Session extends Document {
    @Prop({ required: true })
    date: Date;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
    attendeeIds: Types.ObjectId[];

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    instructorId: Types.ObjectId;

    @Prop({ type: [EmbeddedRoutine], default: [] })
    routines: EmbeddedRoutine[];

    @Prop()
    notes?: string;

    @Prop()
    location?: string;

    @Prop()
    duration?: number;
}

export const SessionSchema = SchemaFactory.createForClass(Session);