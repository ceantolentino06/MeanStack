import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) {}

  getNinjas(){
    return this._http.get('/ninjas')
  }

  getNinjaByName(ninja_name: String){
    return this._http.get(`/ninjas/${ninja_name}`)
  }

}
