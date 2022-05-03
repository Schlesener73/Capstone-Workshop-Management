import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-workshop',
  templateUrl: './view-workshop.component.html',
  styleUrls: ['./view-workshop.component.css']
})
export class ViewWorkshopComponent implements OnInit {
  wsShow: boolean;
  nwsShow: boolean;
  ewsShow: boolean;
  ewsRoute: string;
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
  subscription4: Subscription;
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

  participants = null;
  workshop = null;
  equipment = null;

  constructor(private server: ServerService,
    private route: ActivatedRoute,
    private navbar: NavbarService,
    private router: Router) { }

  ngOnInit() {
    this.getParticipants();
    this.getWorkshop();
    this.setNavigation();
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
    this.subscription4 = this.navbar.ewsRouter.subscribe(ewsRoute => this.ewsRoute = ewsRoute);
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
    this.navbar.changeEWSdisplay(true);
    this.navbar.changeEWSrouter(`workshops/${this.route.snapshot.params.id}`);
    this.navbar.changePTdisplay(true);
    this.navbar.changeAPTdisplay(true);
    this.navbar.changeAPTrouter(`/new-participant/${this.route.snapshot.params.id}`);
    this.navbar.changeEPTdisplay(false);
    this.navbar.changeEQdisplay(true);
    this.navbar.changeAEQdisplay(false);
    this.navbar.changeEEQdisplay(false);
    this.navbar.changeLIdisplay(false);
    this.navbar.changeREGdisplay(false);
    this.navbar.changeLOdisplay(true);
  }

  getParticipants() {
    this.server.viewWorkshop(this.route.snapshot.params.id)
      .subscribe(
        result => {
          this.participants = result;
          this.getEquipment();
        },
        error => {
          console.log(error);
        }
      );
  }

  getWorkshop() {
    this.server.getWorkshop(this.route.snapshot.params.id)
    .subscribe(
      result => {
        this.workshop = result[0];
      },
      error => {
        console.log(error);
      }
    );
  }

  getEquipment() {
    this.server.getWorkshopEquip(this.route.snapshot.params.id)
    .subscribe(
      result => {
        this.equipment = result;
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

  viewEquipment(equipment) {
    this.router.navigate([`/equipment/${equipment.id}`]);
  }

  deleteWorkshop() {
    this.server.deleteWorkshop(this.route.snapshot.params.id)
      .subscribe(
        result => {
          console.log(result);
          this.router.navigate([`/workshops`]);
        },
        error => {
          console.log(error);
        }
      );
  }
}
