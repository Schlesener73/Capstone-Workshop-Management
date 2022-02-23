import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-workshop',
  templateUrl: './edit-workshop.component.html',
  styleUrls: ['./edit-workshop.component.css']
})
export class EditWorkshopComponent implements OnInit {
  workshop = {
    start: new Date(),
    end: new Date(),
    meet: new Date(),
    location: '',
    numofpart: 0,
    frequency: ''
  };
  form: FormGroup;
  editMode: string;

  constructor(
    private server: ServerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    if (this.route.snapshot.params.id == "new")
      this.editMode = "Add";
    else {
      this.editMode = "Edit";
      this.getWorkshop();
    }
  }

  getWorkshop() {
    this.server.getWorkshop(this.route.snapshot.params.id)
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

  saveWorkshop() {
    if (this.editMode == "Add") {
      const data = {
        start: this.workshop.start,
        end: this.workshop.end,
        meet: this.workshop.meet,
        location: this.workshop.location,
        numofpart: 0,
        frequency: this.workshop.frequency
      };
      this.server.addWorkshop(this.workshop)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/workshops']);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.server.updateWorkshop(this.route.snapshot.params.id, this.workshop)
        .subscribe(
          response => {
            console.log(response);
            this.router.navigate(['/workshops']);
          },
          error => {
            console.log(error);
          }
        );
    }
  }

}
