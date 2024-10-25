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
    'http://ec2-34-226-190-76.compute-1.amazonaws.com/events';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Event[]> {
    return this.http.get<any[]>(this.url);
  }
}
