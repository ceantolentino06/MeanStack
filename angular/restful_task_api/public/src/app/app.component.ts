import { Component } from '@angular/core';
import { HttpService } from './http.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'public';

  constructor(private _httpService: HttpService){
    this.getAllTasks();
    this.getOneTask("5d7971a6a6e85443dd0acb53");
  }

  getAllTasks(){
    let observable = this._httpService.getTasks()
    observable.subscribe((data)=>{
      console.log(data);
    })
      
  }

  getOneTask(id: String){
    let observable = this._httpService.getTaskById(id)
    observable.subscribe((data)=>{
      console.log(data);
    })
  }
}
