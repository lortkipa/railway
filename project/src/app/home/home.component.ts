import { Component } from '@angular/core';
import {RailwayService} from '../services/railway.service';
import {station} from '../models/station';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {train} from '../models/train';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private railway : RailwayService) {}

  trains : train[] = []
  stations : station[] = []

  filter_source ?: string;
  filter_destination ?: string;
  filter_date ?: string;

  ngOnInit() {

    // get stations
    this.railway.get_stations().subscribe(data => this.stations = data)

    // get trains
    this.railway.get_trains().subscribe(data => this.trains = data)
  }
}
