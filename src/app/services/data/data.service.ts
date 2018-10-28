import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get<any>(`/api/event/search`);
  }

  getSports() {
    return this.http.get<any>(`/api/sports`);
  }

  postNewEvent(sport: string, name: string, location: string, date: string, deadline: string, description: string) {
    return this.http.post<any>(`/api/event/new`,
    { sport: sport, name: name, location: location, date: date, deadline: deadline, description: description });
  }
}