import { Component } from '@angular/core';
import {FilterComponent} from '../filter/filter.component';
import {DeparturesComponent} from '../departures/departures.component';
import {DepartureComponent} from '../departure/departure.component';
import {CommonModule} from '@angular/common';
import {departureModel} from '../../models/departure';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FilterComponent, DeparturesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}
