import { Option } from "../entities/option";
import { Question } from "../entities/question";
import { User } from "../entities/user";

export interface UserAnswerDto {
  id?: number;
  question?: Question;
  selectedOption?: Option;
  answerText?: string;
  user?: User;
}
