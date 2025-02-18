import { ICategory } from "@/src/entities/categories";
import { IUser } from "@/src/entities/user";

export interface IHistory {
  id: number;
  surname: string;
  name: string;
  patronymic: string;
  is_child: boolean;
  birthDate: string;
  email: string;
  phone: string;
  region: string;
  category: ICategory;
  result_minutes: number;
  result_seconds: number;
  video_file: string;
  user: IUser;
  created_at: string;
  age_category: string;
}
