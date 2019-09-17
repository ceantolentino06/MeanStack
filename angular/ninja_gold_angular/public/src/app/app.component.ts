import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Ninja Gold';
  ninja_score: any;
  ninja_name: any;
  constructor(private _httpService: HttpService){}

  ngOnInit(){
    this.getOneNinja("ceantolentino");
  }

  getOneNinja(ninja_name: String){
    this._httpService.getNinjaByName(ninja_name).subscribe((data)=>{
      this.ninja_score = data['score'];
      this.ninja_name = data['ninja_name']
      console.log(data)
    })
  }

  findGold(location: String){
    if(location=="farm"){
      const random = Math.floor(Math.random() * (20-10+1))+10;
      console.log(random)
      this.ninja_score+=random;
    }else if(location=="cave"){
      const random = Math.floor(Math.random() * (10-5+1))+5;
      console.log(random)
    }else if(location=="house"){
      const random = Math.floor(Math.random() * (5-2+1))+2;
      console.log(random)
    }else if(location=="casino"){
      const random = Math.floor(Math.random() * (50-(-50)+1))+(-50);
      console.log(random)
    }
  }
}
