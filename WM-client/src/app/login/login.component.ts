import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServerService } from '../server.service';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  isLogin: boolean = false
  errorMessage: any

  constructor(
    private _api: ServerService, 
    private _auth: AuthService, 
    private _router:Router
  ) { }

  ngOnInit() {
    this.setNavigation();
    this.isUserLogin(); 
  }

  setNavigation() {
    document.getElementById("AW").setAttribute("class", "hideListItem");
    document.getElementById("EW").setAttribute("class", "hideListItem");
    document.getElementById("AP").setAttribute("class", "hideListItem");
    document.getElementById("EP").setAttribute("class", "hideListItem");
    document.getElementById("AE").setAttribute("class", "hideListItem");
    document.getElementById("EE").setAttribute("class", "hideListItem");
    document.getElementById("LI").setAttribute("class", "hideListItem");
    document.getElementById("REG").setAttribute("class", "showListItem");
    document.getElementById("LO").setAttribute("class", "hideListItem");
    const fixedMenu = document.getElementsByClassName("menu");
    for (let i = 0; i < fixedMenu.length; i++) {
      fixedMenu[i].setAttribute("style", "display:none;");
    }
  }
  
  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value);
    this._api.postTypeRequest('/login', form.value).subscribe((res: any) => {
     
      if (res.status) { 
       
        this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));  
        this._auth.setDataInLocalStorage('token', res.token);  
        document.getElementById("LI").setAttribute("class", "hideListItem");
        document.getElementById("REG").setAttribute("class", "hideListItem");
        document.getElementById("LO").setAttribute("class", "showListItem");
        const fixedMenu = document.getElementsByClassName("menu");
        for (let i = 0; i < fixedMenu.length; i++) {
          fixedMenu[i].setAttribute("style", "display:inline;");
        }
        this._router.navigate(['workshops']);
      }
    })
  }

  isUserLogin(){
    if(this._auth.getUserDetails() != null){
        this.isLogin = true;
    }
  }

  logout(){
    this._auth.clearStorage()
    this._router.navigate(['']);
  }
}