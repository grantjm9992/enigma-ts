export class EmbeddedExerciseDto {
    readonly name: string;
    readonly category: string;
    readonly tags?: string[];
    readonly duration: number;
    readonly description?: string;
    readonly videoUrl?: string;
    readonly order?: number;
}

export class CreateRoutineDto {
    readonly name: string;
    readonly description?: string;
    readonly exercises: EmbeddedExerciseDto[];
}

export class UpdateRoutineDto {
    readonly name?: string;
    readonly description?: string;
    readonly exercises?: EmbeddedExerciseDto[];
}