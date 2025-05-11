import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {admin} from '../models/admin';
import {ReqresService} from '../services/reqres.service';
import {LocalStorageService} from '../services/local-storage.service';
import {AlertService} from '../services/alert.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  admin : admin = new admin();

  constructor(private reqres : ReqresService, private localStorage: LocalStorageService, private alert : AlertService, private route : Router) {}

  login() {

    this.reqres.post_register(this.admin).subscribe({
      next: (body) => {

        // save the token in local storage
        this.localStorage.set('token', body.token)
        this.alert.success(`ადმინი ${this.admin.email} წარმატებით დარეგისტრირდა`, true)
        this.route.navigate(['/home'])

      },
      error: (error) => {

        // alert errors
        this.alert.information('რეგისტრაცია წარუმატებელია', '', true)

      }
    })
  }

}
