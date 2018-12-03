// import { User } from "./user";
// import { Sport } from "./sport";

export class Event {
  sport: string;
  minTeamSize: number;
  maxTeamSize: number;
  eventID: number;
  creator: string;
  name: string;
  latitude: number;
  longitude: number;
  location: string;
  distance: number;
  date: string;
  deadline: string;
  description: string;

  copyFrom(event: any) {
    this.sport = event.sport;
    this.minTeamSize = event.minTeamSize;
    this.maxTeamSize = event.maxTeamSize;
    this.eventID = event.eventID;
    this.creator = event.creator;
    this.name = event.name;
    this.latitude = event.latitude;
    this.longitude = event.longitude;
    this.location = event.location;
    this.distance = parseFloat((Math.round(parseFloat(event.distance) * 100) / 100).toFixed(2));
    this.date = event.date;
    this.deadline = event.deadline;
    this.description = event.description;
  }
}
