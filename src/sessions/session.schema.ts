import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class EmbeddedUser {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    surname: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ required: true })
    role: string;
}

class EmbeddedExercise {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    category: string;

    @Prop({ type: [String], default: [] })
    tags: string[];

    @Prop({ required: true })
    duration: number;

    @Prop()
    description?: string;

    @Prop()
    order?: number;
}

class EmbeddedRoutine {
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

    @Prop({ type: [EmbeddedUser], default: [] })
    attendees: EmbeddedUser[];

    @Prop({ required: true, type: EmbeddedUser })
    instructor: EmbeddedUser;

    @Prop({ type: [EmbeddedRoutine], default: [] })
    routines: EmbeddedRoutine[];

    @Prop()
    notes?: string;

    @Prop()
    location?: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);