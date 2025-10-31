import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  TRAINER = 'trainer',
  USER = 'user',
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop({ required: true })
  password: string; // Hashed password

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  resetToken?: string;

  @Prop()
  resetTokenExpiry?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);