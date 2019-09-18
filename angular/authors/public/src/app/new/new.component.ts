import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newAuthor: any;
  err: {}
  constructor(private _httpService: HttpService, private _router: Router) { }

  ngOnInit() {
    this.newAuthor = {name: ""}
    this.err = {};
  }

  onSubmit(){
    this._httpService.createAuthor(this.newAuthor)
    .then(data=>{
      if(data['result']=="Success"){
        this.redirectHome()
      }else{
        this.err = data['data']['errors']
        console.log(this.err)
      }
    })
    .catch(err=>console.log(err))
  }

  redirectHome(){
    this._router.navigate(['/'])
  }

}
