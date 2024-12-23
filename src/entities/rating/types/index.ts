import { IUser } from "../../user";

export type TCategory = "amateur" | "professional" | "kms" | "master";

export interface IRating {
  id: number;
  rank: string;
  surname: string;
  name: string;
  patronymic: string;
  birthDate: string;
  region: number;
  category: TCategory;
  video_file: string;
  result: number;
  rate: number;
  user: IUser;
  created_at: string;
  result_in_minutes: string;
}
