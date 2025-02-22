export interface CreateUserDto {
  email: string;
  password: string;
  name?: string;
}

export interface UpdateUserDto {
  email?: string;
  name?: string;
}