import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { asLiteral } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-view-workshop',
  templateUrl: './view-workshop.component.html',
  styleUrls: ['./view-workshop.component.css']
})
export class ViewWorkshopComponent implements OnInit {

  participants = null;
  workshop = null;
  equipment = null;

  constructor(private server: ServerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getParticipants();
    this.getWorkshop();
    this.setNavigation();
  }
  
  setNavigation() {
    document.getElementById("AW").setAttribute("class", "hideListItem");
    document.getElementById("EW").setAttribute("class", "showListItem");
    document.getElementById("AP").setAttribute("class", "showListItem");
    document.getElementById("APh").setAttribute("href", `/new-participant/${this.route.snapshot.params.id}`);
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

  getParticipants() {
    this.server.viewWorkshop(this.route.snapshot.params.id)
      .subscribe(
        result => {
          this.participants = result;
          console.log(result);
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
        document.getElementById("EWh").setAttribute("href", `/workshops/${this.workshop.id}`);
        console.log(result);
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
