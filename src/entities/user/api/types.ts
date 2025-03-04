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
  phone: string;
  avatar_url: string;
}

export interface efitProfileDto {
  name: string;
  surname: string;
  region: string;
  city: string;
}
