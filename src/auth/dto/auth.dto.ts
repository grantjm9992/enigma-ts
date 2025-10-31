import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: 'mike@boxing.com' })
    readonly email: string;

    @ApiProperty({ example: 'securepass123' })
    readonly password: string;
}

export class ResetPasswordDto {
    @ApiProperty({ example: 'mike@boxing.com' })
    readonly email: string;
}

export class ChangePasswordDto {
    @ApiProperty({ example: 'resetToken123456' })
    readonly token: string;

    @ApiProperty({ example: 'newSecurePass123' })
    readonly newPassword: string;
}

export class LoginResponseDto {
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
    accessToken: string;

    @ApiProperty()
    user: {
        id: string;
        email: string;
        name: string;
        surname: string;
        role: string;
    };
}