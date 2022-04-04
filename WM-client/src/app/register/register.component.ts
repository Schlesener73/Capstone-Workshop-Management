import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { AuthService } from './../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  isLogin: boolean = false
  errorMessage: any
  constructor(
    private server: ServerService, 
    private _auth: AuthService, 
    private _router:Router
  ) { }

  ngOnInit() {
    this.setNavigation();
    this.isUserLogin(); 
  }

  setNavigation() {
    document.getElementById("LI").setAttribute("class", "showListItem");
    document.getElementById("REG").setAttribute("class", "hideListItem");
    document.getElementById("LO").setAttribute("class", "hideListItem");
    const fixedMenu = document.getElementsByClassName("menu");
    for (let i = 0; i < fixedMenu.length; i++) {
      fixedMenu[i].setAttribute("style", "display:none;");
    }
  }
  
  onSubmit(form: NgForm) {
    this.server.postTypeRequest('/register', form.value).subscribe((res: any) => {
      if (res.status) { 
        console.log(res)
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
      } else { 
        console.log(res)
        alert(res.msg)
      }
    });
  }
  isUserLogin(){
    
    if(this._auth.getUserDetails() != null){
        this.isLogin = true;
    }
  }
}