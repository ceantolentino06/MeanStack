import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authors: any;
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getAllAuthors();
  }

  getAllAuthors() {
    this._httpService.getAuthors()
      .then(data => {
        this.authors = data['data']
      })
      .catch(err => {
        console.log(err)
      })
  }

  onClickDelete(id) {
    this._httpService.deleteAuthor(id)
      .then(()=>this.getAllAuthors())
      .catch(err=>console.log(err))
  }

  
}
