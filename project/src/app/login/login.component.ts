import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {admin} from '../models/admin';
import {ReqresService} from '../services/reqres.service';
import {LocalStorageService} from '../services/local-storage.service';
import {AlertService} from '../services/alert.service';
import {Router} from '@angular/router';
import {SignalService} from '../services/signal.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  admin : admin = new admin();

  constructor(private reqres : ReqresService, private localStorage: LocalStorageService, private alert : AlertService, private route : Router, private signal : SignalService, public _signal : SignalService) {}

  logout() {

    this.localStorage.remove("token")
    this.alert.success(`ადმინი წარმატებით გამოვიდა სისტემიდან`, true)
    this.route.navigate(['/home'])

  }

  login() {

    this.reqres.post_register(this.admin).subscribe({
      next: (body) => {

        // save the token in local storage
        this.localStorage.set('token', body.token)
        this.alert.success(`ადმინი ${this.admin.email} წარმატებით შევიდა სისტემაში`, true)
        this.route.navigate(['/home'])

        this.signal.setText('გამოსვლა')

      },
      error: (error) => {

        // alert errors
        this.alert.information('რეგისტრაცია წარუმატებელია', '', true)

        this.signal.setText('შესვლა')

      }
    })
  }

}
