import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {

  equipment = null;
  
  constructor(private server: ServerService,
    private router: Router) { }

  ngOnInit() {
    this.getEquipment();
  }

  getEquipment() {
    this.server.getEquipment()
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

  viewEquipment(equipment) {
    this.router.navigate([`/equipment/3/${equipment.id}`]);
  }

  addEquipment() {
    this.router.navigate([`/new-equipment/3/0`]);
  }

}
