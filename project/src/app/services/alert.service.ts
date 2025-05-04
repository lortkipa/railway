import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  message(text : string) {
    Swal.fire(text);
  }

  information(title : string, text : string, drag : boolean) {
    Swal.fire({
      title: title,
      text: text,
      icon: "question",
      draggable: drag
    });
  }

  success(text : string, drag : boolean){
    Swal.fire({
      title: text,
      icon: "success",
      draggable: drag
    });
  }

}
