import { Injectable, signal } from '@angular/core';
import {ReqresService} from './reqres.service';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SignalService {

  navLoginText = signal("")

  constructor(private localStorage : LocalStorageService) {
    if (this.localStorage.get("token")){
      this.setText("გამოსვლა")
    } else {
      this.setText("შესვლა")
    }
  }

  setText(userName =""){
    this.navLoginText.set(userName)
    console.log(this.navLoginText())
  }

}
