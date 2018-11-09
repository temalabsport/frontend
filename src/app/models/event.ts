// import { User } from "./user";
// import { Sport } from "./sport";

export class Event {
  sport: string;
  creator: string;
  name: string;
  latitude: number;
  longitude: number;
  location: string;
  distance: number;
  date: Date;
  deadline: Date;
  description: string;

  copyInto(event: any) {
    this.sport = event.sport;
    this.creator = event.creator;
    this.name = event.name;
    this.latitude = event.latitude;
    this.longitude = event.longitude;
    this.location = event.location;
    this.distance = event.distance;
    this.date = new Date(event.date);
    this.deadline = new Date(event.deadline);
    this.description = event.description;
  }
}
