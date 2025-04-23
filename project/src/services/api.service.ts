import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { stationModel } from '../models/station';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  get(url : string) : Observable<any>{
    return this.http.get(url)
  }

  getById(url : string, id : number) : Observable<stationModel>{
    return this.http.get(`${url}/${id}`)
  }
}
