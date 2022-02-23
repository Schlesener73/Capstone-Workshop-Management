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
    this.router.navigate([`/participant/4/${participant.id}`]);
  }

  addParticipant() {
    this.router.navigate([`/new-participant/${this.route.snapshot.params.id}`]);
  }

  viewEquipment(equipment) {
    this.router.navigate([`/equipment/4/${equipment.id}`]);
  }

}
