import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-participant',
  templateUrl: './edit-participant.component.html',
  styleUrls: ['./edit-participant.component.css']
})
export class EditParticipantComponent implements OnInit {
  workshops: any[] = [];
  participant = null;
  originalWS = 0;
  form: FormGroup;

  constructor(
    private server: ServerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.setNavigation();
    this.getParticipant();
    this.getWorkshops();
  }

  setNavigation() {
    document.getElementById("AW").setAttribute("class", "hideListItem");
    document.getElementById("EW").setAttribute("class", "hideListItem");
    document.getElementById("AP").setAttribute("class", "hideListItem");
    document.getElementById("EP").setAttribute("class", "hideListItem");
    document.getElementById("AE").setAttribute("class", "hideListItem");
    document.getElementById("EE").setAttribute("class", "hideListItem");
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
          this.originalWS = this.participant.workshop_id;
          console.log(result);
        },
        error => {
          console.log(error);
        }
      );
  }

  saveParticipant() {
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
          this.router.navigate([`/participant/${this.participant.id}`]);
        },
        error => {
          console.log(error);
        }
      );
  }

}
