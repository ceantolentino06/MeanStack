import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) {}
 
  getTasks(){
    return this._http.get('/tasks');
  }

  getTaskById(id: String){
    return this._http.get(`/tasks/${id}`);
  }

  addTask(newTask){
    return this._http.post("/task", newTask);
  }

  updateTask(task){
    return this._http.put(`/tasks/${task._id}`, task)
  }

  deleteOneTask(id: String){
    return this._http.delete(`/tasks/${id}`)
  }

  getPokemon(){
    return this._http.get('https://pokeapi.co/api/v2/pokemon/1/')
  }

  getPokemonByAbility(url: string){
    return this._http.get(url);
  }
}
