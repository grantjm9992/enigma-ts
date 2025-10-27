export class EmbeddedUserDto {
    readonly name: string;
    readonly surname: string;
    readonly email: string;
    readonly phone: string;
    readonly role: string;
}

export class EmbeddedExerciseDto {
    readonly name: string;
    readonly category: string;
    readonly tags?: string[];
    readonly duration: number;
    readonly description?: string;
    readonly order?: number;
}

export class EmbeddedRoutineDto {
    readonly name: string;
    readonly description?: string;
    readonly exercises: EmbeddedExerciseDto[];
    readonly order?: number;
}

export class CreateSessionDto {
    readonly date: Date;
    readonly attendees?: EmbeddedUserDto[];
    readonly instructor: EmbeddedUserDto;
    readonly routines: EmbeddedRoutineDto[];
    readonly notes?: string;
    readonly location?: string;
}

export class UpdateSessionDto {
    readonly date?: Date;
    readonly attendees?: EmbeddedUserDto[];
    readonly instructor?: EmbeddedUserDto;
    readonly routines?: EmbeddedRoutineDto[];
    readonly notes?: string;
    readonly location?: string;
}