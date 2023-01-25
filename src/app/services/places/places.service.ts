import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { Data } from '../../services/api/api.service';

export interface Place {
  latitude: number;
  longitude: number;
  name: string;
  homepage: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class PlacesService {

  data: Data = {
    name: '',
    sunrise:'string',
    sunset:'string',
    solar_noon:'string',
    day_length:'string',
    civil_twilight_begin:'string',
    civil_twilight_end:'string',
    nautical_twilight_begin:'string',
    nautical_twilight_end:'string',
    astronomical_twilight_begin:'string',
    astronomical_twilight_end:'string'
  }

  private privatePlaces: Place[] = [
    {
      latitude: 49.2295,
      longitude: 17.6555,
      name: 'Zlín, ČR',
      homepage: true
    },
    {
      latitude: 50.0868,
      longitude: 14.4091,
      name: 'Praha, ČR',
      homepage: true
    },
    {
      latitude: 48.8583,
      longitude: 2.2945,
      name: 'Paris, FR',
      homepage: false
    },
    {
      latitude: 51.5287,
      longitude: -0.2416,
      name: 'London, UK',
      homepage: false
    },
    {
      latitude: 40.6976,
      longitude: -74.2598,
      name: 'New York, USA',
      homepage: false
    },
    {
      latitude: 34.0088,
      longitude: -118.4976,
      name: 'Los Angeles, USA',
      homepage: false
    }
  ];


  private privatePlacesSubject = new ReplaySubject<Place[]>(1);

  constructor(
    private storageService: StorageService
  ) {
    this.storageService.getData('places').then(places => {
      if (!places) {
        places = this.privatePlaces;
      }
      this.privatePlacesSubject.next(places);
    });
  }

  // @deprecated
  get places(): Place[] {
    return this.privatePlaces;
  }

  get places$() {
    return this.privatePlacesSubject.asObservable();
  }

  async setHome(index: number, active: boolean) {
    this.privatePlaces[index].homepage = active;
    await this.storageService.saveData('places', this.privatePlaces);
    this.privatePlacesSubject.next(this.privatePlaces);
  }
}
