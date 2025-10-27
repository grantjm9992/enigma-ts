import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateExerciseDto {
    @ApiProperty({ example: 'Jump Rope' })
    readonly name: string;

    @ApiProperty({ example: 'Cardio' })
    readonly category: string;

    @ApiPropertyOptional({ example: ['Beginner', 'Warm-up'], type: [String] })
    readonly tags?: string[];

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

    @ApiPropertyOptional({ example: 'Cardio' })
    readonly category?: string;

    @ApiPropertyOptional({ example: ['Beginner', 'Warm-up'], type: [String] })
    readonly tags?: string[];

    @ApiPropertyOptional({ example: 240, description: 'Duration in seconds' })
    readonly duration?: number;

    @ApiPropertyOptional({ example: 'Updated description' })
    readonly description?: string;

    @ApiPropertyOptional({ example: 'https://example.com/new-video.mp4' })
    readonly videoUrl?: string;
}