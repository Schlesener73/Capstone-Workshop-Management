import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-equipment',
  templateUrl: './edit-equipment.component.html',
  styleUrls: ['./edit-equipment.component.css']
})
export class EditEquipmentComponent implements OnInit {
  equipment = null;
  form: FormGroup;
  source = this.route.snapshot.params.source;

  constructor(
    private server: ServerService,
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
          this.equipment.start.patchValue(this.equipment.start);
          console.log(result);
        },
        error => {
          console.log(error);
        }
      );
  }

  saveEquipment() {
    this.server.updateEquipment(this.route.snapshot.params.id, this.equipment)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate([`/equipment/${this.source}/${this.equipment.id}`]);
        },
        error => {
          console.log(error);
        }
      );
  }

}
