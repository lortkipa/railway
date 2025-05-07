import { Component } from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';
import {RailwayService} from '../services/railway.service';
import {getTicket} from '../models/getTicket';
import {ActivatedRoute} from '@angular/router';
import { NavigationBtnComponent } from "../navigation-btn/navigation-btn.component";
import {CommonModule} from '@angular/common';
import {AlertService} from '../services/alert.service';

@Component({
    selector: 'app-ticket-info',
    standalone: true,
    templateUrl: './ticket-info.component.html',
    styleUrl: './ticket-info.component.scss',
    imports: [NavigationBtnComponent, CommonModule]
})
export class TicketInfoComponent {

  constructor(private alert : AlertService, private route : ActivatedRoute, private localStorage : LocalStorageService, private railway : RailwayService) {}

  ticketID : string[] = []

  tickets : getTicket[] = []

  filteredTickets : getTicket[] = []

  ngOnInit() {
    // poll ticket id
    this.ticketID = this.route.snapshot.params['ticketId']
    console.log(this.ticketID)

    // poll tickets
    this.railway.get_tickets().subscribe(data => {
      this.tickets = data
      console.log(this.tickets)

        // filter the tickets based on ticketIDs
      this.filteredTickets = this.tickets
      .filter((ticket): ticket is getTicket & { id: string } => !!ticket.id)
      .filter(ticket => this.ticketID.includes(ticket.id));
      console.log("Filtered tickets:", this.filteredTickets);
    })
  }

  deleteTicket(ticketId: string) {
    this.railway.delete_ticket(ticketId).subscribe(response => {
      console.log("Deleted:", response);

      // Remove from ticketIDs
      this.localStorage.set("ticketIds", JSON.stringify(this.ticketID));

      // Remove from filteredTickets
      this.filteredTickets = this.filteredTickets.filter(ticket => ticket.id == ticketId);

      // show success alert
      this.alert.success(response, true)
    });
  }
}
