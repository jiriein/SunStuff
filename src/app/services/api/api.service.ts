import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Data{
  name: string,
  sunrise: string,
  sunset: string,
  solar_noon: string,
  day_length: string,
  civil_twilight_begin: string,
  civil_twilight_end: string,
  nautical_twilight_begin: string,
  nautical_twilight_end: string,
  astronomical_twilight_begin: string,
  astronomical_twilight_end: string
}

export interface dataRes{
  results: Data,
  name: any
}

export interface RDic{
  name: string,
  data: Observable<dataRes>
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  URL = 'https://api.sunrise-sunset.org/json?';
  lat = 49.2295;
  lon = 17.6555;
  date = 'today';

  constructor(private http: HttpClient) { }

  getData(lat:number, lon:number, date: string): Observable<dataRes>{
    const url = `${this.URL}lat=${lat}&lng=${lon}&date=${date}`;
    return this.http.get<dataRes>(url);

  }
}
