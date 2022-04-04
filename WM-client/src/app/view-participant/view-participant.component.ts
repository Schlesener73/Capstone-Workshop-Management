import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-participant',
  templateUrl: './view-participant.component.html',
  styleUrls: ['./view-participant.component.css']
})
export class ViewParticipantComponent implements OnInit {
  participant = null;
  equipment = null;
  workshop = null;
  
  constructor(private server: ServerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.setNavigation();
    this.getParticipant();
    this.getEquipment();
  }

  setNavigation() {
    document.getElementById("AW").setAttribute("class", "hideListItem");
    document.getElementById("EW").setAttribute("class", "hideListItem");
    document.getElementById("AP").setAttribute("class", "hideListItem");
    document.getElementById("EP").setAttribute("class", "showListItem");
    document.getElementById("EPh").setAttribute("href", `/participants/${this.route.snapshot.params.id}`);
    document.getElementById("AE").setAttribute("class", "showListItem");
    document.getElementById("AEh").setAttribute("href", `/new-equipment/${this.route.snapshot.params.id}`);
    document.getElementById("EE").setAttribute("class", "hideListItem");
  }

  getParticipant() {
    this.server.getParticipant(this.route.snapshot.params.id)
      .subscribe(
        result => {
          this.participant = result[0];
          this.getWorkshop();
        },
        error => {
          console.log(error);
        }
      );
  }

  getWorkshop() {
    this.server.getWorkshop(this.participant.workshop_id)
      .subscribe(
        result => {
          this.workshop = result[0];
          this.workshop.start = result[0].start.substring(0,10);          
          this.workshop.end = result[0].end.substring(0,10);
        },
        error => {
          console.log(error);
        }
      );
  }

  getEquipment() {
    this.server.viewEquipment(this.route.snapshot.params.id)
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

  deleteParticipant() {
    this.server.deleteParticipant(this.participant)
      .subscribe(
        result => {
          console.log(result);
          if (this.workshop.id != -1) {
            this.server.updateWorkshopCount(this.workshop.id, {})
            .subscribe(
              response => {
                console.log(response);
                this.router.navigate([`/workshop/${this.workshop.id}`]);
              },
              error => {
                console.log(error);
              }
            );
          }
        },
        error => {
          console.log(error);
        }
      );
      this.router.navigate([`/participants`]);
  }

  viewEquipment(equipment) {
    this.router.navigate([`/equipment/${equipment.id}`]);
  }

}
