export interface RequestDTO {
  surname: string;
  name: string;
  patronymic: string;
  birthDate: string | null;
  email: string;
  region: string;
  category_id: string;
  phone: string;
  result_minutes: number;
  result_seconds: number;
  result_exercise: number | null;
  blog_link: string | null;
}
