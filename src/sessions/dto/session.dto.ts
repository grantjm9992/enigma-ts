import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EmbeddedExerciseDto {
    @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'Original exercise ID' })
    readonly exerciseId: string;

    @ApiProperty({ example: 'Jump Rope' })
    readonly name: string;

    @ApiProperty({ example: 180, description: 'Duration in seconds' })
    readonly duration: number;

    @ApiPropertyOptional({ example: '3 min jump rope' })
    readonly description?: string;

    @ApiPropertyOptional({ example: 1 })
    readonly order?: number;
}

export class EmbeddedRoutineDto {
    @ApiProperty({ example: '507f1f77bcf86cd799439012', description: 'Original routine ID' })
    readonly routineId: string;

    @ApiProperty({ example: 'Beginner Morning Routine' })
    readonly name: string;

    @ApiPropertyOptional({ example: 'Easy workout' })
    readonly description?: string;

    @ApiProperty({ type: [EmbeddedExerciseDto] })
    readonly exercises: EmbeddedExerciseDto[];

    @ApiPropertyOptional({ example: 1 })
    readonly order?: number;
}

export class CreateSessionDto {
    @ApiProperty({ example: '2025-10-27T10:00:00.000Z' })
    readonly date: Date;

    @ApiPropertyOptional({
        example: ['507f1f77bcf86cd799439013', '507f1f77bcf86cd799439014'],
        type: [String],
        description: 'Array of user IDs'
    })
    readonly attendeeIds?: string[];

    @ApiProperty({ example: '507f1f77bcf86cd799439015', description: 'Instructor user ID' })
    readonly instructorId: string;

    @ApiProperty({ type: [EmbeddedRoutineDto] })
    readonly routines: EmbeddedRoutineDto[];

    @ApiPropertyOptional({ example: 'Focus on technique today' })
    readonly notes?: string;

    @ApiPropertyOptional({ example: 'Main Gym' })
    readonly location?: string;
}

export class UpdateSessionDto {
    @ApiPropertyOptional({ example: '2025-10-28T10:00:00.000Z' })
    readonly date?: Date;

    @ApiPropertyOptional({
        example: ['507f1f77bcf86cd799439013'],
        type: [String],
        description: 'Array of user IDs'
    })
    readonly attendeeIds?: string[];

    @ApiPropertyOptional({ example: '507f1f77bcf86cd799439015', description: 'Instructor user ID' })
    readonly instructorId?: string;

    @ApiPropertyOptional({ type: [EmbeddedRoutineDto] })
    readonly routines?: EmbeddedRoutineDto[];

    @ApiPropertyOptional({ example: 'Updated notes' })
    readonly notes?: string;

    @ApiPropertyOptional({ example: 'Secondary Gym' })
    readonly location?: string;
}
