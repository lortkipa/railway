import { Component } from '@angular/core';
import {RailwayService} from '../services/railway.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {departure} from '../models/departure';
import {CommonModule} from '@angular/common';
import {LocalStorageService} from '../services/local-storage.service';
import {ticket} from '../models/ticket';
import {NavigationBtnComponent} from '../navigation-btn/navigation-btn.component';
import {AlertService} from '../services/alert.service';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, RouterLink, NavigationBtnComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent {

  constructor(private railway : RailwayService, private route : ActivatedRoute, private localStorage : LocalStorageService, private alert : AlertService) {}

  departures : departure[] = []

  trainIndex : number = -1
  vagonIndex : number = -1

  tickets : ticket[] = []

  date ?: string;

  currentPrice : number = 0;

  ngOnInit() {
    // query the current price
    this.currentPrice = this.localStorage.get("total") || 0

    // get date from param
    this.date = this.route.snapshot.params['date']

    // get departures wich has trains, vagons and seats array
    this.railway.get_filteredDepartures(
      this.route.snapshot.params['source'],
      this.route.snapshot.params['destination'],
      this.route.snapshot.params['date']
    ).subscribe(data => this.departures = data)

    // set emty array in local storage if storage does not exist yet
    if (!this.localStorage.get("tickets")){
      this.localStorage.set("tickets", JSON.stringify([]))
    }

    // get saved tickets from local storage
    this.tickets = JSON.parse(this.localStorage.get("tickets"))

  }

  saveTrainIndex(index : number)
  {
    // save currently pressed train index
    this.trainIndex = index;
  }

  saveVagonIndex(index : number)
  {
    // save currently pressed vagon index
    this.vagonIndex = index;
  }

  saveTicket(name : string, seatId : string, price : number) {
    // if ticket is not in cart, push it, else - remove it
    if (!this.isSeatInCart(name)) {
      this.tickets.push(
        {
          name: name,
          trainId: this.trainIndex,
          vagonId: this.vagonIndex,
          seatId: seatId
        }
      );

      // save total
      let previousTotal : number = this.localStorage.get("total") || 0
      this.currentPrice = Number(previousTotal) + Number(price)
      this.localStorage.set("total", this.currentPrice)
    }
    else {
      this.tickets = this.tickets.filter(
        ticket =>
        !(ticket.name == name &&
          ticket.trainId == this.trainIndex &&
          ticket.vagonId == this.vagonIndex)
      );

      // save total
      let previousTotal : number = this.localStorage.get("total")
      this.currentPrice = Number(previousTotal) - Number(price)
      this.localStorage.set("total", this.currentPrice)
    }

    // save new array in local storage
    this.localStorage.set("tickets", JSON.stringify(this.tickets))

  }

  isSeatInCart(name : string) : boolean
  {
    // return true if same ticket is found in cart, else - return false
    return this.tickets.some(ticket => ticket.name == name && ticket.trainId == this.trainIndex && ticket.vagonId == this.vagonIndex)
  }

  deleteTickets() {
    // update prace
    this.currentPrice = 0;
    this.localStorage.set("total", 0)

    // show alert
    this.alert.success("ყველა ბილეთი კალათიდან წაშლილია", true)

    // clear ticket array
    this.tickets = []

    // clear local storage
    this.localStorage.set("tickets", JSON.stringify([]))
  }

  clearPrice() {
    this.currentPrice = 0;
    this.localStorage.set("total", 0)
  }
}
