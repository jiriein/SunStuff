import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../services/places/places.service';
import { Data, ApiService, dataRes, RDic } from '../services/api/api.service';
import {SettingsPage} from '../settings/settings.page';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public data: Observable<dataRes>[] = [];
  public RDic: RDic[] = [];

  constructor(
    private placesService: PlacesService,
    private apiService: ApiService,
    private modalCtrl: ModalController,
  ) {}

  ngOnInit(): void {
    this.initData('today');
  }

  openDetail(data: Data) {
    this.placesService.data = data;
  }

  openSettings() {
    this.openModal();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: SettingsPage,
    });
    await modal.present();
    await modal.onWillDismiss();
    this.initData('today');
  }

  initData(day: string){
    this.placesService.places$.subscribe(places => {  
      this.RDic = [];
      places.forEach(place => {
        console.log(place);
        if(place.homepage){
          this.RDic.push({name: place.name, data: this.apiService.getData(place.latitude,place.longitude,day)});
        }
        /*this.apiService.getData(place.latitude,place.longitude,day).subscribe(res => {
        res.results.name = place.name;
        this.data_.push(res.results);
      });*/
      });
    })
  }

  /*
  loadData() {
    this.apiService.getData(place.latitude,place.longitude,'today').subscribe(async res => {
     console.log('result: ', res);
    })
  }*/
}
