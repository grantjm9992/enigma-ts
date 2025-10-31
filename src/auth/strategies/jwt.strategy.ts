import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../users/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
        });
    }

    async validate(payload: any) {
        const user = await this.userModel.findById(payload.sub).exec();

        if (!user || !user.isActive) {
            throw new UnauthorizedException();
        }

        return {
            userId: user._id,
            email: user.email,
            role: user.role,
            name: user.name,
            surname: user.surname,
        };
    }
}