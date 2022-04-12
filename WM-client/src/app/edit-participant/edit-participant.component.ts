import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavbarService } from '../services/navbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-participant',
  templateUrl: './edit-participant.component.html',
  styleUrls: ['./edit-participant.component.css']
})
export class EditParticipantComponent implements OnInit {
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

  workshops: any[] = [];
  participant = null;
  originalWS = 0;
  participantForm: FormGroup = this.fb.group({
    first_name: [null, [Validators.required, Validators.pattern('[A-Za-z- ]*')]],
    last_name: [null, [Validators.required, Validators.pattern('[A-Za-z- ]*')]],
    address: [null, Validators.pattern('[A-Za-z0-9- ]*')],
    city: [null, Validators.pattern('[A-Za-z- ]*')],
    state: [null, Validators.pattern('[A-Za-z ]*')],
    zip: [null, Validators.pattern('[0-9]{5}')],
    email: [null, Validators.email],
    phone: [null, Validators.pattern('[0-9]{10}')],
    workshop_id: this.route.snapshot.params.workshopID
  });

  constructor(
    private server: ServerService,
    private navbar: NavbarService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.setNavigation();
    this.getParticipant();
    this.getWorkshops();
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

  getWorkshops() {
    this.server.getWorkshops("all")
      .subscribe(
        result => {
          this.workshops = result;
          console.log(result);
        },
        error => {
          console.log(error);
        }
      );
  }

  getParticipant() {
    this.server.getParticipant(this.route.snapshot.params.id)
      .subscribe(
        result => {
          this.participant = result[0];
          if (this.participant.workshop_id == null)
            this.participant.workshop_id = -1;
          this.participantForm.get('first_name').setValue(this.participant.first_name);
          this.participantForm.get('last_name').setValue(this.participant.last_name);
          this.participantForm.get('address').setValue(this.participant.address);
          this.participantForm.get('city').setValue(this.participant.city);
          this.participantForm.get('state').setValue(this.participant.state);
          this.participantForm.get('zip').setValue(this.participant.zip);
          this.participantForm.get('email').setValue(this.participant.email);
          this.participantForm.get('phone').setValue(this.participant.phone);
          this.participantForm.get('phone').setValue(this.participant.phone);
          this.participantForm.get('workshop_id').setValue(this.participant.workshop_id);
          this.originalWS = this.participant.workshop_id;
          console.log(result);
        },
        error => {
          console.log(error);
        }
      );
  }

  saveParticipant(form) {
    this.participant = {
      first_name: form.value.first_name,
      last_name: form.value.last_name,
      address: form.value.address,
      city: form.value.city,
      state: form.value.state,
      zip: form.value.zip,
      email: form.value.email,
      phone: form.value.phone,
      workshop_id: form.value.workshop_id
    };
    this.server.updateParticipant(this.route.snapshot.params.id, this.participant)
      .subscribe(
        response => {
          console.log(response);
          if (this.originalWS != this.participant.workshop_id) {
            if (this.originalWS != -1)
              this.server.updateWorkshopCount(this.originalWS, {})
              .subscribe(
                response => {
                  console.log(response);
                },
                error => {
                  console.log(error);
                }
              );
            if (this.participant.workshop_id != -1)
              this.server.updateWorkshopCount(this.participant.workshop_id, {})
              .subscribe(
                response => {
                  console.log(response);
                },
                error => {
                  console.log(error);
                }
              );
          }
          this.router.navigate([`/participant/${this.route.snapshot.params.id}`]);
        },
        error => {
          console.log(error);
        }
      );
  }

}
