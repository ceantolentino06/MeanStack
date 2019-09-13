import { Component } from '@angular/core';
import { HttpService } from './http.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'public';
  tasks:any;
  constructor(private _httpService: HttpService){
    
  }

  getAllTasks(){
    let observable = this._httpService.getTasks()
    observable.subscribe((data)=>{
      console.log(data);
      this.tasks = data;
    })
      
  }

  getOneTask(id: String){
    let observable = this._httpService.getTaskById(id)
    observable.subscribe((data)=>{
      console.log(data);
    })
  }

  getBulbasaur(){
    let observable = this._httpService.getPokemon();
    observable.subscribe((data)=>{
      console.log(data);
      console.log(`${data['name']}'s abilities are ${data['abilities'][0]['ability']['name']} and ${data['abilities'][1]['ability']['name']}`)
      let getSameAbilityObs = this._httpService.getPokemonByAbility(data['abilities'][0]['ability']['url'])
      getSameAbilityObs.subscribe((result)=>{
        console.log(`${result['pokemon'].length} have Pokemon the ${result['name']} ability`)
      })
    })
  }
}
