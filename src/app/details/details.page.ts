import { Component, OnInit } from '@angular/core';
import {PlacesService} from '../services/places/places.service';
import { Data } from '../services/api/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  data: Data | undefined;
  name: string | undefined;

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    console.log("Details:" + this.data?.day_length);
    this.data = this.placesService.data;
  }
}
