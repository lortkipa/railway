import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set(key : string, value : string) {
    localStorage.setItem(key, value)
  }

  get(key : string) : any {
    return localStorage.getItem(key)
  }

  remove(key : string) : any {
    return localStorage.removeItem(key)
  }

  clear() {
    localStorage.clear()
  }

  length() : number {
    return localStorage.length
  }

}
