import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateExerciseDto {
    @ApiProperty({ example: 'Jump Rope' })
    readonly name: string;

    @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'Exercise category ID' })
    readonly categoryId: string;

    @ApiPropertyOptional({ example: ['507f1f77bcf86cd799439012', '507f1f77bcf86cd799439013'], type: [String], description: 'Array of tag IDs' })
    readonly tagIds?: string[];

    @ApiProperty({ example: 180, description: 'Duration in seconds' })
    readonly duration: number;

    @ApiPropertyOptional({ example: '3 minutes of continuous jumping' })
    readonly description?: string;

    @ApiPropertyOptional({ example: 'https://example.com/video.mp4' })
    readonly videoUrl?: string;
}

export class UpdateExerciseDto {
    @ApiPropertyOptional({ example: 'Jump Rope' })
    readonly name?: string;

    @ApiPropertyOptional({ example: '507f1f77bcf86cd799439011', description: 'Exercise category ID' })
    readonly categoryId?: string;

    @ApiPropertyOptional({ example: ['507f1f77bcf86cd799439012'], type: [String], description: 'Array of tag IDs' })
    readonly tagIds?: string[];

    @ApiPropertyOptional({ example: 240, description: 'Duration in seconds' })
    readonly duration?: number;

    @ApiPropertyOptional({ example: 'Updated description' })
    readonly description?: string;

    @ApiPropertyOptional({ example: 'https://example.com/new-video.mp4' })
    readonly videoUrl?: string;
}