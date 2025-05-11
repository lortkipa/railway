import {CommonModule} from '@angular/common';
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RailwayService} from '../services/railway.service';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss'
})
export class InformationComponent {

  locations : number = 0;

  constructor(private railway : RailwayService) {}

  ngOnInit() {
    // get stations count
    this.railway.get_stations().subscribe(data => this.locations = data.length)
  }
}
