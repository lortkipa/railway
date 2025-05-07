import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {station} from '../models/station';
import {Observable} from 'rxjs';
import {departure} from '../models/departure';
import {train} from '../models/train';
import {buyTicket} from '../models/buyTicket';
import {seat} from '../models/seat';
import {getTicket} from '../models/getTicket';

@Injectable({
  providedIn: 'root'
})
export class RailwayService {

  constructor(private api : ApiService) { }

  endpoint : string = "https://railway.stepprojects.ge/api"

  get_trains() : Observable<train[]> {
    return this.api.get(`${this.endpoint}/trains`)
  }

  get_stations() : Observable<station[]> {
    return this.api.get(`${this.endpoint}/stations`)
  }

  get_filteredDepartures(from : string, to : string, date : string) : Observable<departure[]> {
    const queryString = `from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}`

    return this.api.get(`${this.endpoint}/getdeparture?${queryString}`)
  }

  get_tickets() : Observable<getTicket[]> {
    return this.api.get(`${this.endpoint}/tickets`)
  }

  get_seat(seatId : string) : Observable<seat> {
    return this.api.get(`${this.endpoint}/seat/${seatId}`)
  }

  post_tickets(form: buyTicket): Observable<any> {
    return this.api.post(`${this.endpoint}/tickets/register`, form)
  }

  delete_ticket(vagonId : string): Observable<any> {
    return this.api.delete(`${this.endpoint}/tickets/cancel/${vagonId}`)
  }

}
