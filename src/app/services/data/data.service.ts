import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from 'src/app/models/user';


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
    { sport: sport, name: name, latitude: 0, longitude: 0, location: location, date: date, deadline: deadline, description: description });
  }

  postNewTeam() {
    return this.http.post<any>(`/api/event/apply`,
    { });
  }

  getUsers() {
    return this.http.get<any>(`/api/user/search`);
  }

  getUser(userName: string) {
    return this.http.get<any>(`/api/user/findByUserName/` + userName);
  }

  getEventsByUser(userName: string) {
    const options = { params: new HttpParams().set('userName', userName) };
    return this.http.get<any>(`/api/event/search`, options);
  }
}
