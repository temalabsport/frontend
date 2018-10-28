// import { User } from "./user";
// import { Sport } from "./sport";

export class Event {
  sport: string;
  creator: string;
  name: string;
  location: string;
  date: string;
  deadline: string;
  description: string;

  copyInto(event: any) {
    this.sport = event.sport;
    this.creator = event.creator;
    this.name = event.name;
    this.location = event.location;
    this.date = event.date;
    this.deadline = event.deadline;
    this.description = event.description;
  }
}
