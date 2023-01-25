import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Place, PlacesService } from '../services/places/places.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  places: Place[] = [];

  form: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private placesService: PlacesService,
    private fb: FormBuilder
  ) {

    this.places = this.placesService.places;
    this.placesService.places$.subscribe(places => {this.places = places;})

    this.form = this.fb.group({
      ch1: [this.places[0].homepage, []], 
      ch2: [this.places[1].homepage, []],
      ch3: [this.places[2].homepage, []],
      ch4: [this.places[3].homepage, []],
      ch5: [this.places[4].homepage, []],
      ch6: [this.places[5].homepage, []]
    });

    this.form.valueChanges.subscribe(data => {
      this.placesService.setHome(0, data.ch1);
      this.placesService.setHome(1, data.ch2);
      this.placesService.setHome(2, data.ch3);
      this.placesService.setHome(3, data.ch4);
      this.placesService.setHome(4, data.ch5);
      this.placesService.setHome(5, data.ch6);
    });
  }

  ngOnInit() {
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }
}
