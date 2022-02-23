import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-equipment',
  templateUrl: './view-equipment.component.html',
  styleUrls: ['./view-equipment.component.css']
})
export class ViewEquipmentComponent implements OnInit {
  participant = null;
  workshop = null;
  equipment = null;
  source = this.route.snapshot.params.source;
  
  constructor(private server: ServerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getEquipment();
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
          if (this.source != 3 && this.source != 4) {
            this.source = (this.source - 5) / 10;
            this.router.navigate([`/participant/${this.source}/${this.participant.id}`]);
          } else
            this.router.navigate([`/equipment`]);
        },
        error => {
          console.log(error);
        }
      );
  }

  editEquipment() {
    this.router.navigate([`/equip/${this.source}/${this.equipment.id}`]);
  }

  toParticipant() {
    if (this.source != 3 && this.source != 4)
      this.source = (this.source - 5) / 10;
    this.router.navigate([`/participant/${this.source}/${this.participant.id}`]);
  }
}
