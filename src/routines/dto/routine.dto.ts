import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EmbeddedExerciseDto {
    @ApiProperty({ example: 'Jump Rope' })
    readonly name: string;

    @ApiProperty({ example: 'Cardio' })
    readonly category: string;

    @ApiPropertyOptional({ example: ['Warm-up'], type: [String] })
    readonly tags?: string[];

    @ApiProperty({ example: 180, description: 'Duration in seconds' })
    readonly duration: number;

    @ApiPropertyOptional({ example: '3 min jump rope' })
    readonly description?: string;

    @ApiPropertyOptional({ example: 'https://example.com/video.mp4' })
    readonly videoUrl?: string;

    @ApiPropertyOptional({ example: 1 })
    readonly order?: number;
}

export class CreateRoutineDto {
    @ApiProperty({ example: 'Beginner Morning Routine' })
    readonly name: string;

    @ApiPropertyOptional({ example: 'Easy morning workout' })
    readonly description?: string;

    @ApiProperty({ type: [EmbeddedExerciseDto] })
    readonly exercises: EmbeddedExerciseDto[];
}

export class UpdateRoutineDto {
    @ApiPropertyOptional({ example: 'Updated Routine Name' })
    readonly name?: string;

    @ApiPropertyOptional({ example: 'Updated description' })
    readonly description?: string;

    @ApiPropertyOptional({ type: [EmbeddedExerciseDto] })
    readonly exercises?: EmbeddedExerciseDto[];
}