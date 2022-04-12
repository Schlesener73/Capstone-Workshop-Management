import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {
  wsShow: boolean;
  nwsShow: boolean;
  ewsShow: boolean;

  ptShow: boolean;
  aptShow: boolean;
  aptRoute: string;
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
  subscription7: Subscription;
  subscription8: Subscription;

  subscription10: Subscription;
  subscription11: Subscription;

  subscription13: Subscription;

  subscription15: Subscription;
  subscription16: Subscription;
  subscription17: Subscription;

  participants: any[] = [];
  option = "all";
  
  constructor(private server: ServerService,
    private navbar: NavbarService,
    private router: Router) { }

  ngOnInit() {
    this.setNavigation();
    this.getParticipants();
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();

    this.subscription5.unsubscribe();
    this.subscription6.unsubscribe();
    this.subscription7.unsubscribe();
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
    this.subscription7 = this.navbar.aptRouter.subscribe(aptRoute => this.aptRoute = aptRoute);
    this.subscription8 = this.navbar.eptDisplay.subscribe(eptShow => this.eptShow = eptShow);

    this.subscription10 = this.navbar.eqDisplay.subscribe(eqShow => this.eqShow = eqShow);
    this.subscription11 = this.navbar.aeqDisplay.subscribe(aeqShow => this.aeqShow = aeqShow);

    this.subscription13 = this.navbar.eeqDisplay.subscribe(eeqShow => this.eeqShow = eeqShow);

    this.subscription15 = this.navbar.liDisplay.subscribe(liShow => this.liShow = liShow);
    this.subscription16 = this.navbar.regDisplay.subscribe(regShow => this.regShow = regShow);
    this.subscription17 = this.navbar.loDisplay.subscribe(loShow => this.loShow = loShow); 
    this.navbar.changeWSdisplay(true);
    this.navbar.changeNWSdisplay(false);
    this.navbar.changeEWSdisplay(false);

    this.navbar.changePTdisplay(true);
    this.navbar.changeAPTdisplay(true);
    this.navbar.changeAPTrouter(`/new-participant/-1`);
    this.navbar.changeEPTdisplay(false);

    this.navbar.changeEQdisplay(true);
    this.navbar.changeAEQdisplay(false);

    this.navbar.changeEEQdisplay(false);

    this.navbar.changeLIdisplay(false);
    this.navbar.changeREGdisplay(false);
    this.navbar.changeLOdisplay(true);
  }

  getParticipants() {
    this.server.getParticipants(this.option)
      .subscribe(
        result => {
          this.participants = result;
          console.log(result);
        },
        error => {
          console.log(error);
        }
      );
  }

  viewParticipant(participant) {
    this.router.navigate([`/participant/${participant.id}`]);
  }

  setSelection(event: any) {
    this.option = event.target.value;
    this.getParticipants();
  }

}
