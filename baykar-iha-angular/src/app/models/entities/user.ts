import { Team } from './team';

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  teams: Team[];
}
