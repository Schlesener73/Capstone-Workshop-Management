import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {

  wsShow: boolean;
  nwsShow: boolean;
  ewsShow: boolean;
  ewsRoute: string;
  ptShow: boolean;
  aptShow: boolean;
  aptRoute: string;
  eptShow: boolean;
  eptRoute: string;
  eqShow: boolean;
  aeqShow: boolean;
  aeqRoute: string;
  eeqShow: boolean;
  eeqRoute: string;
  liShow: boolean;
  regShow: boolean;
  loShow: boolean;

  subscription1: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  subscription4: Subscription;
  subscription5: Subscription;
  subscription6: Subscription;
  subscription7: Subscription;
  subscription8: Subscription;
  subscription9: Subscription;
  subscription10: Subscription;
  subscription11: Subscription;
  subscription12: Subscription;
  subscription13: Subscription;
  subscription14: Subscription;
  subscription15: Subscription;
  subscription16: Subscription;
  subscription17: Subscription;

  constructor(
    private navbar: NavbarService,
    private _auth: AuthService, 
    private _router:Router
  ) { }

  ngOnInit(): void {
    this.subscription1 = this.navbar.wsDisplay.subscribe(wsShow => this.wsShow = wsShow);
    this.subscription2 = this.navbar.nwsDisplay.subscribe(nwsShow => this.nwsShow = nwsShow);
    this.subscription3 = this.navbar.ewsDisplay.subscribe(ewsShow => this.ewsShow = ewsShow);
    this.subscription4 = this.navbar.ewsRouter.subscribe(ewsRoute => this.ewsRoute = ewsRoute);
    this.subscription5 = this.navbar.ptDisplay.subscribe(ptShow => this.ptShow = ptShow);
    this.subscription6 = this.navbar.aptDisplay.subscribe(aptShow => this.aptShow = aptShow);
    this.subscription7 = this.navbar.aptRouter.subscribe(aptRoute => this.aptRoute = aptRoute);
    this.subscription8 = this.navbar.eptDisplay.subscribe(eptShow => this.eptShow = eptShow);
    this.subscription9 = this.navbar.eptRouter.subscribe(eptRoute => this.eptRoute = eptRoute);
    this.subscription10 = this.navbar.eqDisplay.subscribe(eqShow => this.eqShow = eqShow);
    this.subscription11 = this.navbar.aeqDisplay.subscribe(aeqShow => this.aeqShow = aeqShow);
    this.subscription12 = this.navbar.aeqRouter.subscribe(aeqRoute => this.aeqRoute = aeqRoute);
    this.subscription13 = this.navbar.eeqDisplay.subscribe(eeqShow => this.eeqShow = eeqShow);
    this.subscription14 = this.navbar.eeqRouter.subscribe(eeqRoute => this.eeqRoute = eeqRoute);
    this.subscription15 = this.navbar.liDisplay.subscribe(liShow => this.liShow = liShow);
    this.subscription16 = this.navbar.regDisplay.subscribe(regShow => this.regShow = regShow);
    this.subscription17 = this.navbar.loDisplay.subscribe(loShow => this.loShow = loShow); 
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
    this.subscription4.unsubscribe();
    this.subscription5.unsubscribe();
    this.subscription6.unsubscribe();
    this.subscription7.unsubscribe();
    this.subscription8.unsubscribe();
    this.subscription9.unsubscribe();
    this.subscription10.unsubscribe();
    this.subscription11.unsubscribe();
    this.subscription12.unsubscribe();
    this.subscription13.unsubscribe();
    this.subscription14.unsubscribe();
    this.subscription15.unsubscribe();
    this.subscription16.unsubscribe();
    this.subscription17.unsubscribe();
  }
  
  logout(){
    this._auth.clearStorage();
    this._router.navigate(['login']);
  }
}
