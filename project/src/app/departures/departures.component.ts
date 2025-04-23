import { Component } from '@angular/core';
import {RailwayService} from '../../services/railway.service';
import {departureModel} from '../../models/departure';
import { filter_departureModel } from '../../models/departure';
import {CommonModule} from '@angular/common';
import {DepartureComponent} from '../departure/departure.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-departures',
  standalone: true,
  imports: [CommonModule, DepartureComponent],
  templateUrl: './departures.component.html',
  styleUrl: './departures.component.scss'
})
export class DeparturesComponent {

  constructor(private railway : RailwayService, private route : ActivatedRoute) {}

  // departures array
  departures : departureModel[] = []

  // store filter settings here
  filter_departure : filter_departureModel = new filter_departureModel();

  ngOnInit() {
    // get filter parameters
    this.route.paramMap.subscribe(params => {
      this.filter_departure.date = params.get("date")
      this.filter_departure.source = params.get("source")
      this.filter_departure.destination = params.get("destination")
      console.log(this.filter_departure)
    })

    // get departures
    if (this.filter_departure.date == null &&
        this.filter_departure.source == null &&
          this.filter_departure.destination == null){
      this.railway.getDepartures().subscribe(data => {this.departures = data; console.log(this.departures)})
    }
    else {
      this.railway.getFilteredDepartures(
        this.filter_departure.date,
        this.filter_departure.source,
        this.filter_departure.destination,
      ).subscribe(data => {this.departures = data; console.log("data: ", this.departures)})
    }
  }
}
