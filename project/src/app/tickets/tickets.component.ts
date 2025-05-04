import { Component } from '@angular/core';
import {RailwayService} from '../services/railway.service';
import {ActivatedRoute} from '@angular/router';
import {departure} from '../models/departure';
import {CommonModule} from '@angular/common';
import {LocalStorageService} from '../services/local-storage.service';
import {ticket} from '../models/ticket';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent {

  constructor(private railway : RailwayService, private route : ActivatedRoute, private localStorage : LocalStorageService) {}

  departures : departure[] = []

  trainIndex : number = -1;
  vagonIndex : number = -1;

  tickets : ticket[] = []

  ngOnInit() {

    // get departures wich has trains, vagons and seats array
    this.railway.get_filteredDepartures(
      this.route.snapshot.params['source'],
      this.route.snapshot.params['destination'],
      this.route.snapshot.params['date']
    ).subscribe(data => this.departures = data)

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

  saveTicket(name : string) {
    // if ticket is not in cart, push it, else - remove it
    if (!this.isSeatInCart(name)) {
      this.tickets.push(
        {
          name: name,
          trainId: this.trainIndex,
          vagonId: this.vagonIndex
        }
      );
    }
    else {
       this.tickets = this.tickets.filter(ticket =>
      ticket.name != name &&
        ticket.trainId != this.trainIndex &&
        ticket.vagonId != this.vagonIndex
    );
    }
  }

  isSeatInCart(name : string) : boolean
  {
    return this.tickets.some(ticket => ticket.name == name && ticket.trainId == this.trainIndex && ticket.vagonId == this.vagonIndex)
  }
}
