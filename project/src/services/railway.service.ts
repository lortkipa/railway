import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {stationModel} from '../models/station';
import {departureModel} from '../models/departure';

@Injectable({
  providedIn: 'root'
})
export class RailwayService {

  constructor(private api : ApiService) { }

  endPoint = "https://railway.stepprojects.ge/api"

  get(path : string) : Observable<any> {
    return this.api.get(`${this.endPoint}/${path}`)
  }

  getStations() : Observable<stationModel[]> {
    return this.get("stations")
  }

  getDepartures() : Observable<departureModel[]>{
    return this.get("departures")
  }
}
