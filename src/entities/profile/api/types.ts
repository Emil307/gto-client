export interface editProfileDto {
  name?: string;
  surname?: string;
  patronymic?: string;
  sex?: string;
  birthDate?: string | Date;
  region?: string;
  city?: string | null;
  phone?: string;
}
