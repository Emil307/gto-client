export interface IUser {
  id: number;
  email: string;
  surname: string;
  name: string;
  patronymic: string;
  birthDate: string;
  sex: "male" | "female" | "default";
  region?: string;
  city?: string;
  createdAt: string;
  age: number;
}

export interface efitProfileDto {
  name: string;
  surname: string;
  region: string;
  city: string;
}
