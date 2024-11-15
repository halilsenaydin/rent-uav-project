import { Option } from "./option";
import { UserAnswer } from "./userAnswer";

export interface Question {
  id?: number;
  text?: string;
  image?: string | File;
  type?: string;
  level?: string;
  createdDate?: Date;
  status?: boolean;
  options?: Option[];
  userAnswers?: UserAnswer[];
}
