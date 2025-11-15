import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Session } from './session.schema';
import { CreateSessionDto, UpdateSessionDto } from './dto/session.dto';

@Injectable()
export class SessionsService {
    constructor(@InjectModel(Session.name) private sessionModel: Model<Session>) {}

    async create(createSessionDto: CreateSessionDto): Promise<Session> {
        const session = new this.sessionModel(createSessionDto);
        return session.save();
    }

    async findAll(): Promise<Session[]> {
        return this.sessionModel.find().sort({ date: -1 }).exec();
    }

    async findOne(id: string): Promise<Session> {
        const session = await this.sessionModel.findById(id).exec();
        if (!session) {
            throw new NotFoundException(`Session with ID ${id} not found`);
        }
        return session;
    }

    async findByDate(startDate: Date, endDate: Date): Promise<Session[]> {
        return this.sessionModel
            .find({
                date: { $gte: startDate, $lte: endDate },
            })
            .sort({ date: 1 })
            .exec();
    }

    async findByInstructor(instructorEmail: string): Promise<Session[]> {
        return this.sessionModel
            .find({ 'instructor.email': instructorEmail })
            .sort({ date: -1 })
            .exec();
    }

    async update(id: string, updateSessionDto: UpdateSessionDto): Promise<Session> {
        const session = await this.sessionModel
            .findByIdAndUpdate(id, updateSessionDto, { new: true })
            .exec();

        if (!session) {
            throw new NotFoundException(`Session with ID ${id} not found`);
        }
        return session;
    }

    async remove(id: string): Promise<void> {
        const result = await this.sessionModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Session with ID ${id} not found`);
        }
    }

    async signupToSession(sessionId: string, userId: string): Promise<Session> {
        const session = await this.sessionModel.findById(sessionId).exec();

        if (!session) {
            throw new NotFoundException(`Session with ID ${sessionId} not found`);
        }

        const userObjectId = new Types.ObjectId(userId);

        // Check if user is already signed up
        const isAlreadySignedUp = session.attendeeIds.some(
            (attendeeId) => attendeeId.toString() === userId
        );

        if (isAlreadySignedUp) {
            throw new BadRequestException('User is already signed up for this session');
        }

        // Add user to attendeeIds
        session.attendeeIds.push(userObjectId);
        return session.save();
    }

    async removeFromSession(sessionId: string, userId: string): Promise<Session> {
        const session = await this.sessionModel.findById(sessionId).exec();

        if (!session) {
            throw new NotFoundException(`Session with ID ${sessionId} not found`);
        }

        // Check if user is signed up
        const attendeeIndex = session.attendeeIds.findIndex(
            (attendeeId) => attendeeId.toString() === userId
        );

        if (attendeeIndex === -1) {
            throw new BadRequestException('User is not signed up for this session');
        }

        // Remove user from attendeeIds
        session.attendeeIds.splice(attendeeIndex, 1);
        return session.save();
    }
}