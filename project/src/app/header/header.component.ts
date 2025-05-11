import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterModule} from '@angular/router';
import {LocalStorageService} from '../services/local-storage.service';
import {AlertService} from '../services/alert.service';
import {filter} from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  app : string = "რკინიგზის ბილეთები"

  constructor(private localStorage : LocalStorageService, private alert : AlertService, private route : Router) {}

  token ?: string;
  currentRoute ?: string;

  navLoginText : string = ""

  ngOnInit() {
     this.route.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects
      });

    // get token
    this.token = this.localStorage.get("token")

    // set nav login text
    this.navLoginText = this.token ? 'გამოსვლა' : 'შესვლა'
  }

  navigateLogin() {

    // get token
    this.token = this.localStorage.get("token")

    if (this.token) {
      this.localStorage.remove('token')
      this.alert.success('ადმინი სისტემიდან წარმატებით გამოვიდა', true)
      this.navLoginText = 'გამოსვლა'
    } else {
      this.navLoginText = 'შესვლა'
      this.route.navigate(["/login"])
    }

  }
}
