import { Component } from '@angular/core';
import {RailwayService} from '../../services/railway.service';
import {departureModel} from '../../models/departure';
import {CommonModule} from '@angular/common';
import {DepartureComponent} from '../departure/departure.component';

@Component({
  selector: 'app-departures',
  standalone: true,
  imports: [CommonModule, DepartureComponent],
  templateUrl: './departures.component.html',
  styleUrl: './departures.component.scss'
})
export class DeparturesComponent {

  constructor(private railway : RailwayService) {}

  // departures array
  departures : departureModel[] = []

  ngOnInit() {
    // get departures
    this.railway.getDepartures().subscribe(data => {this.departures = data; console.log(this.departures)})
  }
}
