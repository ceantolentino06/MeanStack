import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-sanjose',
  templateUrl: './sanjose.component.html',
  styleUrls: ['./sanjose.component.css']
})
export class SanjoseComponent implements OnInit {
  weather: any;
  
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getSJWeather();
  }

  getSJWeather(){
    this._httpService.getWeather("San Jose, US")
    .then(data=>{
      this.weather = data;
      console.log(data)
    })
    .catch(err=>console.log(err))
  }
}
