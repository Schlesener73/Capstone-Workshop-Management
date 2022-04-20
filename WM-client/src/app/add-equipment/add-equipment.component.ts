import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavbarService } from '../services/navbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css']
})

export class AddEquipmentComponent implements OnInit {
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

  participants: any[] = [];
  //fileInputLabel: string;
  equipmentForm: FormGroup = this.fb.group({
    name: [null, [Validators.required, Validators.minLength(1)]],
    storage_loc: null,
    year: [null, [Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(4)]],
    image: [''],
    eq_condition: null,
    participant_id: this.route.snapshot.params.participantID
  });

  constructor(
    private server: ServerService,
    private route: ActivatedRoute,
    private router: Router,
    private navbar: NavbarService,
    private fb: FormBuilder
    ) { }

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

  getParticipants() {
    this.server.getParticipants("all")
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

  onFileSelect(event) {
    const file = event.target.files[0];
    alert("file: " + file);
    //this.fileInputLabel = file.name;
    this.equipmentForm.get('image').setValue(file);
  }

  createEquipment(form) {
    var filename = this.equipmentForm.get('image').value;
    const formData = new FormData();
    alert("FN: " + filename);
    if (filename != '' && filename != null) {
      formData.append('uploadedImage', filename);
      this.server.uploadFile(formData)
        .subscribe(
          response => {
            console.log(response);
            filename = response.uploadedFile.filename;
            const data = {
              name: form.value.name,
              storage_loc: form.value.storage_loc,
              year: form.value.year,
              image: filename,
              eq_condition: form.value.eq_condition,
            };
            this.server.addEquipment(data, form.value.participant_id)
              .subscribe(
                response => {
                if (this.route.snapshot.params.participantID == -1)
                    this.router.navigate([`/equipment`]);
                  else 
                    this.router.navigate([`/participant/${this.route.snapshot.params.participantID}`]);
                },
                error => {
                  console.log(error);
                }
              );
          },
          error => {
            console.log(error);
          }
        );
    }
    else {
      const data = {
        name: form.value.name,
        storage_loc: form.value.storage_loc,
        year: form.value.year,
        image: null,
        eq_condition: form.value.eq_condition,
      };
      this.server.addEquipment(data, form.value.participant_id)
        .subscribe(
          response => {
          if (this.route.snapshot.params.participantID == -1)
              this.router.navigate([`/equipment`]);
            else 
              this.router.navigate([`/participant/${this.route.snapshot.params.participantID}`]);
          },
          error => {
            console.log(error);
          }
        )
    }
  }

}
