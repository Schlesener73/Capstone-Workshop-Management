import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavbarService } from '../services/navbar.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-edit-workshop',
  templateUrl: './edit-workshop.component.html',
  styleUrls: ['./edit-workshop.component.css']
})
export class EditWorkshopComponent implements OnInit {
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

  workshop = {
    start: new Date(),
    end: new Date(),
    meet: new Date(),
    location: '',
    numofpart: 0,
    frequency: ''
  };
  workshopForm: FormGroup = this.fb.group({
    start: [null, Validators.required],
    end: [null, Validators.required],
    meet: [null, Validators.required],
    location: [null, Validators.required],
    numofpart: [0],
    frequency: [null, Validators.required]
  });
  editMode: string;

  constructor(
    private server: ServerService,
    private route: ActivatedRoute,
    private navbar: NavbarService,
    private router: Router,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.setNavigation();
    this.getWorkshop();
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
    this.navbar.changeWSdisplay(true);
    this.navbar.changeNWSdisplay(false);
    this.navbar.changeEWSdisplay(false);

    this.navbar.changePTdisplay(true);
    this.navbar.changeAPTdisplay(false);

    this.navbar.changeEPTdisplay(false);

    this.navbar.changeEQdisplay(true);
    this.navbar.changeAEQdisplay(false);

    this.navbar.changeEEQdisplay(false);

    this.navbar.changeLIdisplay(false);
    this.navbar.changeREGdisplay(false);
    this.navbar.changeLOdisplay(true);
}

  getWorkshop() {
    this.server.getWorkshop(this.route.snapshot.params.id)
      .subscribe(
        result => {
          this.workshop = result[0];
          this.workshop.start = result[0].start.substring(0,10);          
          this.workshop.end = result[0].end.substring(0,10);
          this.workshopForm.get('start').setValue(this.workshop.start);
          this.workshopForm.get('end').setValue(this.workshop.end);
          this.workshopForm.get('meet').setValue(this.workshop.meet);
          this.workshopForm.get('location').setValue(this.workshop.location);
          this.workshopForm.get('numofpart').setValue(this.workshop.numofpart);
          this.workshopForm.get('frequency').setValue(this.workshop.frequency);
          console.log(result);
        },
        error => {
          console.log(error);
        }
      );
  }

  saveWorkshop(form) {
    const data = {
      start: form.value.start,
      end: form.value.end,
      meet: form.value.meet,
      location: form.value.location,
      numofpart: form.value.numofpart,
      frequency: form.value.frequency
    };
    this.server.updateWorkshop(this.route.snapshot.params.id, data)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate([`/workshop/${this.route.snapshot.params.id}`]);
        },
        error => {
          console.log(error);
        }
      );
  }

}
