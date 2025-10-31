import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/user.schema';
import { LoginDto, ResetPasswordDto, ChangePasswordDto } from './dto/auth.dto';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        // Find user by email
        const user = await this.userModel.findOne({ email, isActive: true }).exec();

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // In production, you should compare hashed passwords using bcrypt
        // For now, comparing plain text (NOT SECURE - CHANGE IN PRODUCTION)
        if (user.password !== password) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate a simple token (In production, use JWT)
        const token = this.generateToken(user);

        return {
            accessToken: token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                surname: user.surname,
                role: user.role,
            },
        };
    }

    async requestPasswordReset(resetPasswordDto: ResetPasswordDto) {
        const { email } = resetPasswordDto;

        const user = await this.userModel.findOne({ email }).exec();

        if (!user) {
            // Don't reveal if user exists or not for security
            return {
                message: 'If an account with that email exists, a password reset link has been sent.',
            };
        }

        // Generate reset token (in production, save this to DB with expiry)
        const resetToken = crypto.randomBytes(32).toString('hex');

        // In production:
        // 1. Save resetToken and expiry to user document
        // 2. Send email with reset link containing the token
        // 3. Token should expire after 1 hour

        console.log(`Password reset token for ${email}: ${resetToken}`);
        console.log(`Reset link: http://localhost:3000/auth/reset-password?token=${resetToken}`);

        return {
            message: 'If an account with that email exists, a password reset link has been sent.',
            // Remove this in production - only for testing
            resetToken: resetToken,
        };
    }

    async changePassword(changePasswordDto: ChangePasswordDto) {
        const { token, newPassword } = changePasswordDto;

        // In production:
        // 1. Find user by reset token
        // 2. Check if token is expired
        // 3. Hash new password with bcrypt
        // 4. Update password and clear reset token

        // This is a simplified version for demonstration
        throw new BadRequestException('Token validation not implemented. In production, validate token from database.');

        // Example production code:
        // const user = await this.userModel.findOne({
        //   resetToken: token,
        //   resetTokenExpiry: { $gt: new Date() }
        // }).exec();
        //
        // if (!user) {
        //   throw new BadRequestException('Invalid or expired reset token');
        // }
        //
        // const hashedPassword = await bcrypt.hash(newPassword, 10);
        // user.password = hashedPassword;
        // user.resetToken = undefined;
        // user.resetTokenExpiry = undefined;
        // await user.save();
        //
        // return { message: 'Password successfully changed' };
    }

    private generateToken(user: any): string {
        // In production, use proper JWT with @nestjs/jwt
        // Example: return this.jwtService.sign({ sub: user._id, email: user.email });

        // Simple token for demonstration (NOT SECURE)
        const payload = {
            userId: user._id,
            email: user.email,
            role: user.role,
        };
        return Buffer.from(JSON.stringify(payload)).toString('base64');
    }

    async validateToken(token: string) {
        try {
            // In production, verify JWT token
            const payload = JSON.parse(Buffer.from(token, 'base64').toString());
            const user = await this.userModel.findById(payload.userId).exec();

            if (!user || !user.isActive) {
                throw new UnauthorizedException('Invalid token');
            }

            return user;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}