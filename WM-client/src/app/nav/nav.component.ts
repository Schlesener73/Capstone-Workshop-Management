import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent {

  constructor(
    private _auth: AuthService, 
    private _router:Router
  ) { }
  
  logout(){
    this._auth.clearStorage();
    document.getElementById("LI").setAttribute("class", "showListItem");
    document.getElementById("REG").setAttribute("class", "showListItem");
    document.getElementById("LO").setAttribute("class", "hideListItem");
    this._router.navigate(['login']);
  }
}
