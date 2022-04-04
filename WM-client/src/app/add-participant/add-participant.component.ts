import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/server.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.css']
})
export class AddParticipantComponent implements OnInit {
  workshops: any[] = [];
  participant = {
    first_name: '',
    last_name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    phone: '',
    workshop_id: this.route.snapshot.params.workshopID
  };

  constructor(
    private server: ServerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.setNavigation();
    this.getWorkshops();
  }

  setNavigation() {
    document.getElementById("AW").setAttribute("class", "hideListItem");
    document.getElementById("EW").setAttribute("class", "hideListItem");
    document.getElementById("AP").setAttribute("class", "hideListItem");
    document.getElementById("EP").setAttribute("class", "hideListItem");
    document.getElementById("AE").setAttribute("class", "hideListItem");
    document.getElementById("EE").setAttribute("class", "hideListItem");
    document.getElementById("LI").setAttribute("class", "hideListItem");
    document.getElementById("REG").setAttribute("class", "hideListItem");
    document.getElementById("LO").setAttribute("class", "showListItem");
    const fixedMenu = document.getElementsByClassName("menu");
    for (let i = 0; i < fixedMenu.length; i++) {
      fixedMenu[i].setAttribute("style", "display:inline;");
    }
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

  createParticipant() {
    const data = {
      first_name: this.participant.first_name,
      last_name: this.participant.last_name,
      address: this.participant.address,
      city: this.participant.city,
      state: this.participant.state,
      zip: this.participant.zip,
      email: this.participant.email,
      phone: this.participant.phone
    };

    this.server.addParticipant(data, this.participant.workshop_id)
      .subscribe(
        response => {
          console.log(response);
          if (this.participant.workshop_id != -1) {
            this.server.updateWorkshopCount(this.participant.workshop_id, data)
            .subscribe(
              response => {
                console.log(response);
                this.router.navigate([`/workshop/${this.participant.workshop_id}`]);
              },
              error => {
                console.log(error);
              }
            );
          }
          else
            this.router.navigate([`/participants`]);
        },
        error => {
          console.log(error);
        }
      );

  }

}
