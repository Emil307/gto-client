import { IUser } from "../../user";

export interface IRating {
  id: number;
  rank: string;
  surname: string;
  name: string;
  patronymic: string;
  birthDate: string;
  region: number;
  category: string;
  video_file: string;
  result: number;
  rate: number;
  user: IUser;
  created_at: string;
}
