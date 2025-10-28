import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EmbeddedUserDto {
    @ApiProperty({ example: 'Mike' })
    readonly name: string;

    @ApiProperty({ example: 'Tyson' })
    readonly surname: string;

    @ApiProperty({ example: 'mike@boxing.com' })
    readonly email: string;

    @ApiProperty({ example: '+1234567890' })
    readonly phone: string;

    @ApiProperty({ example: 'trainer', enum: ['admin', 'trainer', 'user'] })
    readonly role: string;
}

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

    @ApiPropertyOptional({ example: 1 })
    readonly order?: number;
}

export class EmbeddedRoutineDto {
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

    @ApiPropertyOptional({ type: [EmbeddedUserDto] })
    readonly attendees?: EmbeddedUserDto[];

    @ApiProperty({ type: EmbeddedUserDto })
    readonly instructor: EmbeddedUserDto;

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

    @ApiPropertyOptional({ type: [EmbeddedUserDto] })
    readonly attendees?: EmbeddedUserDto[];

    @ApiPropertyOptional({ type: EmbeddedUserDto })
    readonly instructor?: EmbeddedUserDto;

    @ApiPropertyOptional({ type: [EmbeddedRoutineDto] })
    readonly routines?: EmbeddedRoutineDto[];

    @ApiPropertyOptional({ example: 'Updated notes' })
    readonly notes?: string;

    @ApiPropertyOptional({ example: 'Secondary Gym' })
    readonly location?: string;
}