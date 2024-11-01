import { IUser } from "@/src/entities/user";

export interface registrationDto {
  name: string;
  surname: string;
  patronymic: string;
  email: string;
  birthDate: string;
  sex: string;
}

export interface loginDto {
  email: string;
  code: number;
}

export interface AuthResponseDto {
  access_token: string;
  refresh_token: string;
  user: IUser;
}

export interface confirmEmailDto {
  code: string;
}
