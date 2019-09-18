import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) {}

  getAuthors(){
    return this._http.get('/authors').toPromise();
  }

  createAuthor(author){
    return this._http.post('/author', author).toPromise();
  }

  deleteAuthor(id){
    return this._http.delete(`/authors/${id}`).toPromise();
  }

  updateAuthor(author){
    return this._http.put(`/authors/${author._id}`, author).toPromise();
  }

  getAuthorById(id){
    return this._http.get(`/authors/${id}`).toPromise();
  }

}
