import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})

export class NavbarService {
  private wsShow = new BehaviorSubject(false);
  wsDisplay = this.wsShow.asObservable();
  private nwsShow = new BehaviorSubject(false);
  nwsDisplay = this.nwsShow.asObservable();
  private ewsShow = new BehaviorSubject(false);
  ewsDisplay = this.ewsShow.asObservable();
  private ewsRoute = new BehaviorSubject('');
  ewsRouter = this.ewsRoute.asObservable();

  private ptShow = new BehaviorSubject(false);
  ptDisplay = this.ptShow.asObservable();
  private aptShow = new BehaviorSubject(false);
  aptDisplay = this.aptShow.asObservable();
  private aptRoute = new BehaviorSubject('');
  aptRouter = this.aptRoute.asObservable();
  private eptShow = new BehaviorSubject(false);
  eptDisplay = this.eptShow.asObservable();
  private eptRoute = new BehaviorSubject('');
  eptRouter = this.eptRoute.asObservable();

  private eqShow = new BehaviorSubject(false);
  eqDisplay = this.eqShow.asObservable();
  private aeqShow = new BehaviorSubject(false);
  aeqDisplay = this.aeqShow.asObservable();
  private aeqRoute = new BehaviorSubject('');
  aeqRouter = this.aeqRoute.asObservable();
  private eeqShow = new BehaviorSubject(false);
  eeqDisplay = this.eeqShow.asObservable();
  private eeqRoute = new BehaviorSubject('');
  eeqRouter = this.eeqRoute.asObservable();

  private liShow = new BehaviorSubject(false);
  liDisplay = this.liShow.asObservable();
  private regShow = new BehaviorSubject(false);
  regDisplay = this.regShow.asObservable();
  private loShow = new BehaviorSubject(false);
  loDisplay = this.loShow.asObservable();

  constructor() { }
 
  changeWSdisplay(show: boolean) {
    this.wsShow.next(show);
  }

  changeNWSdisplay(show: boolean) {
    this.nwsShow.next(show);
  }

  changeEWSdisplay(show: boolean) {
    this.ewsShow.next(show);
  }

  changeEWSrouter(show: string) {
    this.ewsRoute.next(show);
  }


  changePTdisplay(show: boolean) {
    this.ptShow.next(show);
  }

  changeAPTdisplay(show: boolean) {
    this.aptShow.next(show);
  }

  changeAPTrouter(show: string) {
    this.aptRoute.next(show);
  }

  changeEPTdisplay(show: boolean) {
    this.eptShow.next(show);
  }

  changeEPTrouter(show: string) {
    this.eptRoute.next(show);
  }


  changeEQdisplay(show: boolean) {
    this.eqShow.next(show);
  }

  changeAEQdisplay(show: boolean) {
    this.aeqShow.next(show);
  }

  changeAEQrouter(show: string) {
    this.aeqRoute.next(show);
  }

  changeEEQdisplay(show: boolean) {
    this.eeqShow.next(show);
  }

  changeEEQrouter(show: string) {
    this.eeqRoute.next(show);
  }


  changeLIdisplay(show: boolean) {
    this.liShow.next(show);
  }

  changeREGdisplay(show: boolean) {
    this.regShow.next(show);
  }

  changeLOdisplay(show: boolean) {
    this.loShow.next(show);
  }

}
