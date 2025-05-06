import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { NavigationBtnComponent } from "../navigation-btn/navigation-btn.component";
import {RailwayService} from '../services/railway.service';
import {ActivatedRoute} from '@angular/router';
import {LocalStorageService} from '../services/local-storage.service';
import {ticket} from '../models/ticket';
import {buyTicket} from '../models/buyTicket';
import {AlertService} from '../services/alert.service';

@Component({
    selector: 'app-buy',
    standalone: true,
    imports: [FormsModule, NavigationBtnComponent],
    templateUrl: './buy.component.html',
    styleUrl: './buy.component.scss'
})
export class BuyComponent {

  constructor(private railway : RailwayService, private alert : AlertService, private route : ActivatedRoute, private localStorage : LocalStorageService) {}

  // connected to inputs
  name ?: string;
  surname ?: string;
  email ?: string;

  date : string = "";

  tickets : ticket[] = []

  ngOnInit() {
    // get date
    this.date = this.route.snapshot.params['date']

    // get saved tickets from local storage
    this.tickets = JSON.parse(this.localStorage.get("tickets"))
  }

  buyTickets() {
    console.log(this.tickets)
    for (let i = 0; i < this.tickets.length; i++)
    {
      let form : buyTicket = {
        date: this.date,
        trainId: this.tickets[i].trainId + 1,
        email: this.email,
        phoneNumber: '1234567',
        people: [
          {
            name: this.name,
            seatId: this.tickets[i].seatId,
            surname: this.surname,
            idNumber: '',
            status: '',
            payoutCompleted: true
          },
        ]
      };

      this.railway.post_tickets(form)
      this.alert.success("ბილეთი წარმატებით დაიჯავშნა", true)

    }
  }
}
