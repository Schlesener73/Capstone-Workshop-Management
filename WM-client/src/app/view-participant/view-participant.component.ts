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
  source = this.route.snapshot.params.source;
  
  constructor(private server: ServerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getParticipant();
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
          this.getEquipment();
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

  addEquipment() {
    this.router.navigate([`/new-equipment/${this.source}/${this.route.snapshot.params.id}`]);
  }

  toWorkshop() {
    this.router.navigate([`/workshop/${this.workshop.id}`]);
  }

  deleteParticipant() {
    this.server.deleteParticipant(this.participant)
      .subscribe(
        result => {
          console.log(result);
          this.server.updateWorkshopCount(this.route.snapshot.params.id, {})
          .subscribe(
            response => {
              console.log(response);
              if (this.source == 4) 
                this.toWorkshop();
              else if (this.source == 3)
                this.router.navigate([`/equipment`]);          
              else
                this.router.navigate([`/participants`]);          
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

  editParticipant() {
    this.router.navigate([`/participants/${this.source}/${this.participant.id}`]);
  }

  viewEquipment(equipment) {
    this.source = this.source * 10 + 5;
    this.router.navigate([`/equipment/${this.source}/${equipment.id}`]);
  }

}
