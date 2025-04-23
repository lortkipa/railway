import { Component } from '@angular/core';
import {RailwayService} from '../../services/railway.service';
import { stationModel } from '../../models/station';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {

  constructor(private railway : RailwayService) {}

  // stations array
  stations : stationModel[] = [];

  ngOnInit() {
    // get stations
    this.railway.getStations().subscribe(res => { this.stations = res; console.log(this.stations)})
  }
}
