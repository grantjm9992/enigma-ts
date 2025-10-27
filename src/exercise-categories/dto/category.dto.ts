import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateExerciseCategoryDto {
    @ApiProperty({ example: 'Cardio' })
    readonly name: string;

    @ApiPropertyOptional({ example: 'Cardiovascular exercises for endurance' })
    readonly description?: string;
}

export class UpdateExerciseCategoryDto {
    @ApiPropertyOptional({ example: 'Cardio Training' })
    readonly name?: string;

    @ApiPropertyOptional({ example: 'Updated description' })
    readonly description?: string;
}