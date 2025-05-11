import {CommonModule} from '@angular/common';
import { Component } from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';
import {RailwayService} from '../services/railway.service';
import {getTicket} from '../models/getTicket';
import {Router, RouterLink} from '@angular/router';
import {AlertService} from '../services/alert.service';
import {ReqresService} from '../services/reqres.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  constructor(private alert : AlertService, private localStorage : LocalStorageService, private railway : RailwayService, private route : Router, private reqres : ReqresService) {}

  ticketIDs : string[] = []

  tickets : getTicket[] = []

  filteredTickets : getTicket[] = []

  token ?: string;

  ngOnInit() {
    // poll ticket ids
    this.ticketIDs = JSON.parse(this.localStorage.get("ticketIds"))
    console.log(this.ticketIDs)

    // poll tickets
    this.railway.get_tickets().subscribe(data => {
      this.tickets = data
      console.log(this.tickets)

        // filter the tickets based on ticketIDs
      this.filteredTickets = this.tickets
      .filter((ticket): ticket is getTicket & { id: string } => !!ticket.id)
      .filter(ticket => this.ticketIDs.includes(ticket.id));
      console.log("Filtered tickets:", this.filteredTickets);
    })

    // get token
    this.token = this.localStorage.get('token')
  }

  deleteTicket(ticketId: string) {
  this.railway.delete_ticket(ticketId).subscribe(response => {
    console.log("Deleted:", response);

    // Remove from ticketIDs
    this.ticketIDs = this.ticketIDs.filter(id => id !== ticketId);
    this.localStorage.set("ticketIds", JSON.stringify(this.ticketIDs));

    // Remove from filteredTickets
    this.filteredTickets = this.filteredTickets.filter(ticket => ticket.id !== ticketId);

    // show success alert
    this.alert.success(response, true)
  });
  }

  deleteAllTickets() {
    this.railway.delete_allTickets().subscribe(() => this.alert.success("ყველა ბილეთი გაუქმებულია", true))
    this.route.navigate(['/home'])
  }
}
