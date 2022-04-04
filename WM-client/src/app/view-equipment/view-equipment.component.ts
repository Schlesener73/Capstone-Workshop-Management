import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-equipment',
  templateUrl: './view-equipment.component.html',
  styleUrls: ['./view-equipment.component.css']
})
export class ViewEquipmentComponent implements OnInit {
  participant = null;
  workshop = null;
  equipment = null;
  imagePath = environment.serverUrl + environment.imagesDir;
  
  constructor(private server: ServerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.setNavigation();
    this.getEquipment();
  }

  setNavigation() {
    document.getElementById("AW").setAttribute("class", "hideListItem");
    document.getElementById("EW").setAttribute("class", "hideListItem");
    document.getElementById("AP").setAttribute("class", "hideListItem");
    document.getElementById("EP").setAttribute("class", "hideListItem");
    document.getElementById("AE").setAttribute("class", "hideListItem");
    document.getElementById("EE").setAttribute("class", "showListItem");
    document.getElementById("EEh").setAttribute("href", `/equip/${this.route.snapshot.params.id}`);
  }

  getEquipment() {
    this.server.getEquip(this.route.snapshot.params.id)
      .subscribe(
        result => {
          this.equipment = result[0];
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
          if (this.participant.id != -1)
            this.router.navigate([`/participant/${this.participant.id}`]);
        },
        error => {
          console.log(error);
        }
      );
    this.router.navigate([`/equipment`]);
  }

}
