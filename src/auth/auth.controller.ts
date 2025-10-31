import {
    Controller,
    Post,
    Body,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, ResetPasswordDto, ChangePasswordDto, LoginResponseDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Login with email and password' })
    @ApiResponse({
        status: 200,
        description: 'Login successful',
        type: LoginResponseDto
    })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('request-password-reset')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Request password reset email' })
    @ApiResponse({
        status: 200,
        description: 'Password reset email sent (if account exists)'
    })
    requestPasswordReset(@Body() resetPasswordDto: ResetPasswordDto) {
        return this.authService.requestPasswordReset(resetPasswordDto);
    }

    @Post('reset-password')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Reset password with token' })
    @ApiResponse({ status: 200, description: 'Password successfully changed' })
    @ApiResponse({ status: 400, description: 'Invalid or expired token' })
    changePassword(@Body() changePasswordDto: ChangePasswordDto) {
        return this.authService.changePassword(changePasswordDto);
    }
}