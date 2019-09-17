import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '';
  tasks: any;
  task: any;
  newTask: any;
  selectedTask: any;
  constructor(private _httpService: HttpService) {

  }

  ngOnInit() {
    this.newTask = { "title": "", "description": "" }
    this.task = { "title": "", "description": "" }
    this.getAllTasks();
  }

  getAllTasks() {
    let observable = this._httpService.getTasks()
    observable.subscribe((data) => {
      console.log(data);
      this.tasks = data;
    })
  }

  do(event: any) {
    console.log(event)
  }

  submitCreate() {
    this._httpService.addTask(this.newTask)
      .subscribe((data) => {
        this.newTask = { "title": "", "description": "" }
        this.getAllTasks();
      })

  }

  getOneToUpdate(id: String) {
    this._httpService.getTaskById(id)
      .subscribe((data) => {
        this.task = data;
        console.log(data);
      })
  }

  getOneTask(id: String) {
    this._httpService.getTaskById(id)
      .subscribe((data) => {
        this.selectedTask = data;
        console.log(data);
      })
  }

  deleteTask(id: String) {
    this._httpService.deleteOneTask(id)
      .subscribe((data) => {
        this.getAllTasks();
      })
  }

  submitUpdate() {
    this._httpService.updateTask(this.task)
      .subscribe((data) => {
        this.newTask = { "title": "", "description": "" }
        this.getAllTasks();
      })
  }

  getBulbasaur() {
    let observable = this._httpService.getPokemon();
    observable.subscribe((data) => {
      console.log(data);
      console.log(`${data['name']}'s abilities are ${data['abilities'][0]['ability']['name']} and ${data['abilities'][1]['ability']['name']}`)
      let getSameAbilityObs = this._httpService.getPokemonByAbility(data['abilities'][0]['ability']['url'])
      getSameAbilityObs.subscribe((result) => {
        console.log(`${result['pokemon'].length} have Pokemon the ${result['name']} ability`)
      })
    })
  }
}
