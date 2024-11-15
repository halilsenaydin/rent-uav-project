import { Question } from "../entities/question";

export interface Quiz {
  id?: number;
  user?: number;
  createdDate?: Date;
  questions?: Question[];
}
