import { Component, Input } from '@angular/core';
import { departureModel } from '../../models/departure';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-departure',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './departure.component.html',
  styleUrl: './departure.component.scss'
})
export class DepartureComponent {
  // get single departure
  @Input() departure !: departureModel;
}
