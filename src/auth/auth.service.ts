import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from '../users/user.schema';
import { LoginDto, ResetPasswordDto, ChangePasswordDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        // Find user by email
        const user = await this.userModel.findOne({ email, isActive: true }).exec();

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Compare hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate JWT token
        const payload = { sub: user._id, email: user.email, role: user.role };
        const accessToken = this.jwtService.sign(payload);

        return {
            accessToken,
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

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = await bcrypt.hash(resetToken, 10);

        // Save hashed token with 1 hour expiry
        user.resetToken = hashedToken;
        user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
        await user.save();

        // In production: Send email with reset link
        // Example: await this.emailService.sendPasswordReset(email, resetToken);

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

        // Find user with valid reset token
        const users = await this.userModel.find({
            resetToken: { $exists: true },
            resetTokenExpiry: { $gt: new Date() },
        }).exec();

        let validUser = null;
        for (const user of users) {
            const isValidToken = await bcrypt.compare(token, user.resetToken);
            if (isValidToken) {
                validUser = user;
                break;
            }
        }

        if (!validUser) {
            throw new BadRequestException('Invalid or expired reset token');
        }

        // Hash new password and update user
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        validUser.password = hashedPassword;
        validUser.resetToken = undefined;
        validUser.resetTokenExpiry = undefined;
        await validUser.save();

        return { message: 'Password successfully changed' };
    }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userModel.findOne({ email }).exec();

        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user.toObject();
            return result;
        }

        return null;
    }
}