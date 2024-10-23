import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../models/Reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  // private url: string = 'http://localhost:8080/reservation';
  private url: string =
    'http://ec2-54-174-111-131.compute-1.amazonaws.com:8080/reservation';
  constructor(private http: HttpClient) {}

  findAll(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.url);
  }
}