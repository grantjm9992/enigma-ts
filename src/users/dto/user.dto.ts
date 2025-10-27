import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'Mike' })
    readonly name: string;

    @ApiProperty({ example: 'Tyson' })
    readonly surname: string;

    @ApiProperty({ example: 'mike@boxing.com' })
    readonly email: string;

    @ApiProperty({ example: '+1234567890' })
    readonly phone: string;

    @ApiPropertyOptional({ example: 'trainer', enum: ['admin', 'trainer', 'user'], default: 'user' })
    readonly role?: string;

    @ApiProperty({ example: 'securepass123' })
    readonly password: string;
}

export class UpdateUserDto {
    @ApiPropertyOptional({ example: 'Michael' })
    readonly name?: string;

    @ApiPropertyOptional({ example: 'Tyson' })
    readonly surname?: string;

    @ApiPropertyOptional({ example: 'mike@boxing.com' })
    readonly email?: string;

    @ApiPropertyOptional({ example: '+9876543210' })
    readonly phone?: string;

    @ApiPropertyOptional({ example: 'trainer', enum: ['admin', 'trainer', 'user'] })
    readonly role?: string;

    @ApiPropertyOptional({ example: 'newsecurepass123' })
    readonly password?: string;

    @ApiPropertyOptional({ example: true })
    readonly isActive?: boolean;
}