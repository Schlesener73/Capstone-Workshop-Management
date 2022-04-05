import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-equipment',
  templateUrl: './edit-equipment.component.html',
  styleUrls: ['./edit-equipment.component.css']
})

export class EditEquipmentComponent implements OnInit {
  participants: any[] = [];
  equipment = null;
  fileInputLabel: string;
  equipmentForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    storage_loc: ['', Validators.required],
    year: '',
    image: [''],
    eq_condition: '',
    participant_id: ''
  });
  
  constructor(
    private server: ServerService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.setNavigation();
    this.getEquipment();
    this.getParticipants();
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

  getParticipants() {
    this.server.getParticipants()
      .subscribe(
        result => {
          this.participants = result;
          console.log(result);
        },
        error => {
          console.log(error);
        }
      );
  }

  getEquipment() {
    this.server.getEquip(this.route.snapshot.params.id)
      .subscribe(
        result => {
          this.equipment = result[0];
          if (this.equipment.participant_id == null)
            this.equipment.participant_id = -1;
          this.equipmentForm.get('name').setValue(this.equipment.name);
          this.equipmentForm.get('storage_loc').setValue(this.equipment.storage_loc);
          this.equipmentForm.get('year').setValue(this.equipment.year);
//          this.equipmentForm.get('image').setValue(this.equipment.image);
          this.equipmentForm.get('eq_condition').setValue(this.equipment.eq_condition);
          this.equipmentForm.get('participant_id').setValue(this.equipment.participant_id);
          console.log(result);
        },
        error => {
          console.log(error);
        }
      );
  }

  onFileSelect(event) {
    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    this.equipmentForm.get('image').setValue(file);
  }

  saveEquipment(form) {
    const formData = new FormData();
    formData.append('uploadedImage', this.equipmentForm.get('image').value);
    this.equipment = {
      name: form.value.name,
      storage_loc: form.value.storage_loc,
      year: form.value.year,
      image: form.value.image.substring(12),
      eq_condition: form.value.eq_condition,
      participant_id: form.value.participant_id
    };
    /*this.server.uploadFile(formData)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );*/
    alert("Image " + this.equipment.image);
    this.server.updateEquipment(this.route.snapshot.params.id, this.equipment)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate([`/equipment/${this.route.snapshot.params.id}`]);
        },
        error => {
          console.log(error);
        }
      );
  }

}
