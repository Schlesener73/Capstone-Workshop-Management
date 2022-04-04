import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css']
})

export class AddEquipmentComponent implements OnInit {
  fileInputLabel: string;
  equipmentForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    storage_loc: ['', Validators.required],
    year: '',
    image: [''],
    eq_condition: ''
  });

  constructor(
    private server: ServerService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.setNavigation();
  }

  setNavigation() {
    document.getElementById("AW").setAttribute("class", "hideListItem");
    document.getElementById("EW").setAttribute("class", "hideListItem");
    document.getElementById("AP").setAttribute("class", "hideListItem");
    document.getElementById("EP").setAttribute("class", "hideListItem");
    document.getElementById("AE").setAttribute("class", "hideListItem");
    document.getElementById("EE").setAttribute("class", "hideListItem");
  }

  onFileSelect(event) {
    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    this.equipmentForm.get('image').setValue(file);
  }

  createEquipment(form) {
    const formData = new FormData();
    formData.append('uploadedImage', this.equipmentForm.get('image').value);
    const data = {
      name: form.value.name,
      storage_loc: form.value.storage_loc,
      year: form.value.year,
      image: form.value.image.substring(12),
      eq_condition: form.value.eq_condition,
    };
    this.server.uploadFile(formData)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    this.server.addEquipment(data, this.route.snapshot.params.participantID)
    .subscribe(
      response => {
       if (this.route.snapshot.params.participantID == -1)
          this.router.navigate([`/equipment`]);
        else 
          this.router.navigate([`/participant/${this.route.snapshot.params.participantID}`]);
      },
      error => {
        console.log(error);
      }
    );
  }

}
