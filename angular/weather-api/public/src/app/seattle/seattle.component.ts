import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-seattle',
  templateUrl: './seattle.component.html',
  styleUrls: ['./seattle.component.css']
})
export class SeattleComponent implements OnInit {
  weather: any;
  
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getSJWeather();
  }

  getSJWeather(){
    this._httpService.getWeather("Seattle, US")
    .then(data=>{
      this.weather = data;
      console.log(data)
    })
    .catch(err=>console.log(err))
  }
}
