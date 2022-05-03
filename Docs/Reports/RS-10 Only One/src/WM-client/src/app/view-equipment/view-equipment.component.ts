import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NavbarService } from '../services/navbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-equipment',
  templateUrl: './view-equipment.component.html',
  styleUrls: ['./view-equipment.component.css']
})
export class ViewEquipmentComponent implements OnInit {
  wsShow: boolean;
  nwsShow: boolean;
  ewsShow: boolean;
  ptShow: boolean;
  aptShow: boolean;
  eptShow: boolean;
  eqShow: boolean;
  aeqShow: boolean;
  eeqShow: boolean;
  eeqRoute: string;
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
  subscription14: Subscription;
  subscription15: Subscription;
  subscription16: Subscription;
  subscription17: Subscription;

  participant = {workshop_id: null};
  workshop = null;
  equipment = null;
  imagePath = environment.serverUrl + environment.imagesDir;
  
  constructor(private server: ServerService,
    private route: ActivatedRoute,
    private navbar: NavbarService,
    private router: Router) { }

  ngOnInit() {
    this.setNavigation();
    this.getEquipment();
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
    this.subscription14.unsubscribe();
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
    this.subscription14 = this.navbar.eeqRouter.subscribe(eeqRoute => this.eeqRoute = eeqRoute);
    this.subscription15 = this.navbar.liDisplay.subscribe(liShow => this.liShow = liShow);
    this.subscription16 = this.navbar.regDisplay.subscribe(regShow => this.regShow = regShow);
    this.subscription17 = this.navbar.loDisplay.subscribe(loShow => this.loShow = loShow); 
    this.navbar.changeWSdisplay(true);
    this.navbar.changeNWSdisplay(false);
    this.navbar.changeEWSdisplay(false);
    this.navbar.changePTdisplay(true);
    this.navbar.changeAPTdisplay(false);
    this.navbar.changeEPTdisplay(false);
    this.navbar.changeEQdisplay(true);
    this.navbar.changeAEQdisplay(false);
    this.navbar.changeEEQdisplay(true);
    this.navbar.changeEEQrouter(`/equip/${this.route.snapshot.params.id}`);
    this.navbar.changeLIdisplay(false);
    this.navbar.changeREGdisplay(false);
    this.navbar.changeLOdisplay(true);
  }

  getEquipment() {
    this.server.getEquip(this.route.snapshot.params.id)
      .subscribe(
        result => {
          this.equipment = result[0];
          if (this.equipment.participant_id != null)
            this.getParticipant();
        },
        error => {
          console.log(error);
        }
      );
  }

  getParticipant() {
    if (this.equipment.participant_id != null)
      this.server.getParticipant(this.equipment.participant_id)
      .subscribe(
        result => {
          this.participant = result[0];
          if (this.participant.workshop_id != null)
            this.getWorkshop();
        },
        error => {
          console.log(error);
        }
      );
  }

  getWorkshop() {
    if (this.participant.workshop_id != null)
      this.server.getWorkshop(this.participant.workshop_id)
      .subscribe(
        result => {
          this.workshop = result[0];
          this.workshop.start = result[0].start.substring(0,10);          
          this.workshop.end = result[0].end.substring(0,10);
          console.log(result);
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteEquipment() {
    this.server.deleteEquipment(this.equipment)
      .subscribe(
        result => {
          console.log(result);
          if (this.equipment.participant_id != null)
            this.router.navigate([`/participant/${this.equipment.participant_id}`]);
        },
        error => {
          console.log(error);
        }
      );
    this.router.navigate([`/equipment`]);
  }

}
