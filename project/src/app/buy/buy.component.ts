import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { NavigationBtnComponent } from "../navigation-btn/navigation-btn.component";
import {RailwayService} from '../services/railway.service';
import {ActivatedRoute, Router} from '@angular/router';
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

  constructor(private railway : RailwayService, private alert : AlertService, private router : Router, private route : ActivatedRoute, private localStorage : LocalStorageService) {}

  // connected to inputs
  name ?: string;
  surname ?: string;
  email ?: string;
  number ?: string;

  date : string = "";

  tickets : ticket[] = []

  ticketIds : string[] = []

  ngOnInit() {
    // get date
    this.date = this.route.snapshot.params['date']

    // get saved tickets from local storage
    this.tickets = JSON.parse(this.localStorage.get("tickets"))
  }

  buyTickets() {
    for (let i = 0; i < this.tickets.length; i++) {
      let form : buyTicket = {
        date: this.date,
        trainId: this.tickets[i].trainId + 1,
        email: this.email,
        phoneNumber: this.number?.toString(),
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
      let ticketId : string;
      this.railway.post_tickets(form).subscribe(data => {
        ticketId = data
        ticketId = ticketId.split(':')[1]
        this.ticketIds.push(ticketId)
        this.localStorage.set("ticketIds", JSON.stringify(this.ticketIds))
        console.log(data)
      })
    }
    this.alert.success("ბილეთი წარმატებით დაიჯავშნა", true)
    this.localStorage.set("tickets", JSON.stringify([]))
    this.router.navigate(['/home']);

  }
}
