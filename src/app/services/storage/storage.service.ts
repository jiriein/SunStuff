import {Injectable} from '@angular/core';
import {Preferences} from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  async saveData(key: string, data: any) {
    await Preferences.set({
      key,
      value: JSON.stringify(data),
    });
  }

  async getData(key: string) {
    const {value} = await Preferences.get({ key });
    if(value)
    return JSON.parse(value);
  }
}
