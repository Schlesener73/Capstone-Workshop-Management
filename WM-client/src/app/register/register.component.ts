import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { AuthService } from './../services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  wsShow: boolean;
  nwsShow: boolean;
  ewsShow: boolean;

  ptShow: boolean;
  aptShow: boolean;

  eptShow: boolean;

  eqShow: boolean;
  aeqShow: boolean;

  eeqShow: boolean;

  liShow: boolean;
  regShow: boolean;
  loShow: boolean;
  subscription1: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;

  subscription5: Subscription;
  subscription6: Subscription;

  subscription8: Subscription;

  subscription10: Subscription;
  subscription11: Subscription;

  subscription13: Subscription;

  subscription15: Subscription;
  subscription16: Subscription;
  subscription17: Subscription;

  isLogin: boolean = false;
  errorMessage: any;
  loginForm: FormGroup = this.fb.group({
    username: [null, [Validators.required, Validators.minLength(3)]],
    password: [null, [Validators.required, Validators.minLength(8)]]
  });

  constructor(
    private server: ServerService, 
    private _auth: AuthService, 
    private navbar: NavbarService,
    private _router:Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.setNavigation();
    this.isUserLogin(); 
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();

    this.subscription5.unsubscribe();
    this.subscription6.unsubscribe();

    this.subscription8.unsubscribe();

    this.subscription10.unsubscribe();
    this.subscription11.unsubscribe();

    this.subscription13.unsubscribe();

    this.subscription15.unsubscribe();
    this.subscription16.unsubscribe();
    this.subscription17.unsubscribe();
  }

  setNavigation() {
    this.subscription1 = this.navbar.wsDisplay.subscribe(wsShow => this.wsShow = wsShow);
    this.subscription2 = this.navbar.nwsDisplay.subscribe(nwsShow => this.nwsShow = nwsShow);
    this.subscription3 = this.navbar.ewsDisplay.subscribe(ewsShow => this.ewsShow = ewsShow);

    this.subscription5 = this.navbar.ptDisplay.subscribe(ptShow => this.ptShow = ptShow);
    this.subscription6 = this.navbar.aptDisplay.subscribe(aptShow => this.aptShow = aptShow);

    this.subscription8 = this.navbar.eptDisplay.subscribe(eptShow => this.eptShow = eptShow);

    this.subscription10 = this.navbar.eqDisplay.subscribe(eqShow => this.eqShow = eqShow);
    this.subscription11 = this.navbar.aeqDisplay.subscribe(aeqShow => this.aeqShow = aeqShow);

    this.subscription13 = this.navbar.eeqDisplay.subscribe(eeqShow => this.eeqShow = eeqShow);

    this.subscription15 = this.navbar.liDisplay.subscribe(liShow => this.liShow = liShow);
    this.subscription16 = this.navbar.regDisplay.subscribe(regShow => this.regShow = regShow);
    this.subscription17 = this.navbar.loDisplay.subscribe(loShow => this.loShow = loShow); 
    this.navbar.changeWSdisplay(false);
    this.navbar.changeNWSdisplay(false);
    this.navbar.changeEWSdisplay(false);

    this.navbar.changePTdisplay(false);
    this.navbar.changeAPTdisplay(false);

    this.navbar.changeEPTdisplay(false);

    this.navbar.changeEQdisplay(false);
    this.navbar.changeAEQdisplay(false);

    this.navbar.changeEEQdisplay(false);

    this.navbar.changeLIdisplay(true);
    this.navbar.changeREGdisplay(false);
    this.navbar.changeLOdisplay(false);
  }
  
  submitLogin(form) {
    this.server.postTypeRequest('/register', form.value).subscribe((res: any) => {
      if (res.status) { 
        console.log(res)
        this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));  
        this._auth.setDataInLocalStorage('token', res.token);
        this._router.navigate(['workshops']);
      } else { 
        console.log(res)
        alert(res.msg)
      }
    });
  }

  isUserLogin(){
    if(this._auth.getUserDetails() != null) {
      this.isLogin = true;
      this._router.navigate(['workshops']);
    }
  }
}