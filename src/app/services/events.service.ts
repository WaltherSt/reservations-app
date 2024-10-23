import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/Event';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  // private url: string = 'http://localhost:8080/events';
  private url: string =
    'http://ec2-54-174-111-131.compute-1.amazonaws.com:8080/events';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Event[]> {
    return this.http.get<any[]>(this.url);
  }
}
