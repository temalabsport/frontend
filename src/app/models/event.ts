import { User } from './user';
import { Sport } from './sport';

export class Event {
  sport: Sport;
  creator: User;
  name: string;
  location: string;
  date: Date;
  description: string;
}
