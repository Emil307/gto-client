export interface ICategory {
  id: number;
  title: string;
  instruction: string;
  is_able_to_choice: boolean;
  subcategories: ICategory[];
  is_needed_time: boolean;
  is_needed_exercise: boolean;
  is_needed_blog: boolean;
}
