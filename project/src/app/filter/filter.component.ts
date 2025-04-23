import { Component } from '@angular/core';
import {RailwayService} from '../../services/railway.service';
import { stationModel } from '../../models/station';
import { departureModel } from '../../models/departure';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
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

  // this interface is connected to form inputs and selects
  departure : departureModel = {
    id: undefined,
    source : undefined,
    destination: undefined,
    date: undefined,
    trains: undefined
  };

  getDay(date : any) : string {
    let day_strings = ["ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი", "კვირა"]

    let _date = new Date(date)
    let day = _date.getDay() - 1

    return day_strings[day]
  }
}
