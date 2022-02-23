import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-workshop',
  templateUrl: './add-workshop.component.html',
  styleUrls: ['./add-workshop.component.css']
})
export class AddWorkshopComponent implements OnInit {
  workshop = {
    start: new Date(),
    end: new Date(),
    meet: new Date(),
    location: '',
    numofpart: 0,
    frequency: ''
  };

  constructor(
    private server: ServerService,
    private router: Router) { }

  ngOnInit() {
  }

  createWorkshop() {
    const data = {
      start: this.workshop.start,
      end: this.workshop.end,
      meet: this.workshop.meet,
      location: this.workshop.location,
      numofpart: 0,
      frequency: this.workshop.frequency
    };

    this.server.addWorkshop(data)
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

  cancel() {
    this.router.navigate(['/workshops']);
  }
}
