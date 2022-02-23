import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/server.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css']
})
export class AddEquipmentComponent implements OnInit {
  equipment = {
    name: '',
    storage_loc: '',
    year: '',
    image: null,
    eq_condition: '',
    participant_id: this.route.snapshot.params.participantID
  };
  source = this.route.snapshot.params.source;

  constructor(
    private server: ServerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  createEquipment() {
    const data = {
      name: this.equipment.name,
      storage_loc: this.equipment.storage_loc,
      year: this.equipment.year,
      image: this.equipment.image,
      eq_condition: this.equipment.eq_condition,
    };
    this.server.addEquipment(data, this.equipment.participant_id)
      .subscribe(
        response => {
          console.log(response);
          if (this.route.snapshot.params.participantID == 0)
            this.router.navigate([`/equipment`]);
          else 
            this.router.navigate([`/participant/${this.source}/${this.equipment.participant_id}`]);
        },
        error => {
          console.log(error);
        }
      );
  }

}
