import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTagDto {
    @ApiProperty({ example: 'Beginner' })
    readonly name: string;

    @ApiPropertyOptional({ example: '#00FF00' })
    readonly color?: string;
}

export class UpdateTagDto {
    @ApiPropertyOptional({ example: 'Advanced Beginner' })
    readonly name?: string;

    @ApiPropertyOptional({ example: '#FF0000' })
    readonly color?: string;
}