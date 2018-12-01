import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getEvents(lonLat: any) {
    let params = new HttpParams();

    // Begin assigning parameters
    params = params.append('long', lonLat.longitude);
    params = params.append('lat', lonLat.latitude);
    params = params.append('pageSize', '100');
    return this.http.get<any>(`/api/event/search`, { params: params });
  }

  getSports() {
    return this.http.get<any>(`/api/sports`);
  }

  postNewEvent(
    sport: string,
    name: string,
    location: string,
    date: string,
    deadline: string,
    description: string,
    latitude: number,
    longitude: number
  ) {
    return this.http.post<any>(`/api/event/new`, {
      sport: sport,
      name: name,
      latitude: latitude,
      longitude: longitude,
      location: location,
      date: date,
      deadline: deadline,
      description: description
    });
  }

  // eventID:
  //   type: number
  // teamName:
  //   type: string
  // members:
  //   type: array
  //   items:
  //     type: string
  postNewTeam(eventID: number, teamName: string, members: string[]) {
    return this.http.post<any>(`/api/event/apply`, {
      eventID: eventID,
      teamName: teamName,
      members: members
    });
  }

  getUsers() {
    const options = { params: new HttpParams().set('pageSize', '100') };
    return this.http.get<any>(`/api/user/search`, options);
  }

  getUser(userName: string) {
    return this.http.get<any>(`/api/user/findByUserName/` + userName);
  }

  getEventsByUser(userName: string) {
    const options = { params: new HttpParams().set('userName', userName).set('pageSize', '100') };
    return this.http.get<any>(`/api/event/search`, options);
  }

  getEventByID(eventID: number) {
    return this.http.get<any>(`/api/event/` + eventID.toString());
  }
}
