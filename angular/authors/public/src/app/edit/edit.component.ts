import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  author:any;
  id:any;
  err:any;
  constructor(
    private _httpService: HttpService,
    private _router: Router,
    private _route: ActivatedRoute,
    ) {}

  ngOnInit() {
    this.err = {};
    this.author = {};
    this._route.params.subscribe((params: Params)=>{
      this.id=params['id'];
    })
    this._httpService.getAuthorById(this.id)
    .then(data=>{
      this.author = data['data'];
    })
    .catch(err=>console.log(err))
  }


  onSubmit(){
    this._httpService.updateAuthor(this.author)
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

  getOneAuthor(){
    this._httpService.getAuthorById(this.id)
    .then(data=>{
      this.author = data;
      console.log(data)
    })
    .catch(err=>console.log(err))
  }

  redirectHome(){
    this._router.navigate(['/'])
  }

}
