import { ICategory } from "../../categories";
import { IUser } from "../../user";

export interface IRating {
  id: number;
  rank: string;
  surname: string;
  name: string;
  patronymic: string;
  birthDate: string;
  region: number;
  category: ICategory;
  video_file: string;
  result: number;
  rate: number;
  user: IUser;
  created_at: string;
  result_minutes: number;
  result_seconds: number;
  age_category: string;
}
