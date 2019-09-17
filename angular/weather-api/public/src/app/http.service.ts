import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getWeather(location){
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=0103a528898d009c9c4e83cdd579cfc0`
    return this._http.get(url).toPromise();
    
  }
}
