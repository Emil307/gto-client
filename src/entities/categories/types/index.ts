export interface ICategory {
  id: number;
  title: string;
  instruction: string;
  is_able_to_choice: boolean;
  subcategories: ICategory[];
}
