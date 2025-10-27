export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly age?: number;
}

export class UpdateUserDto {
  readonly name?: string;
  readonly email?: string;
  readonly age?: number;
  readonly isActive?: boolean;
}
