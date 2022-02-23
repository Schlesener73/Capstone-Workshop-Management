import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.css']
})
export class WorkshopsComponent implements OnInit {

  workshops: any[] = [];
  showDates = "all";
  
  constructor(private server: ServerService,
    private router: Router) { }

  ngOnInit() {
    this.getWorkshops();
  }

  getWorkshops() {
    this.server.getWorkshops(this.showDates)
      .subscribe(
        result => {
          this.workshops = result;
          console.log(result);
        },
        error => {
          console.log(error);
        }
      );

  }

  deleteWorkshop(workshop) {
    this.server.deleteWorkshop(workshop)
      .subscribe(
        result => {
          this.getWorkshops();
          console.log(result);
        },
        error => {
          console.log(error);
        }
      );
  }

  editWorkshop(workshop) {
    this.router.navigate([`/workshops/${workshop.id}`]);
  }

  viewWorkshop(workshop) {
    this.router.navigate([`/workshop/${workshop.id}`]);
  }

  addWorkshop() {
    this.router.navigate([`/workshops/new`]);
  }

  setSelection(event: any) {
    this.showDates = event.target.value;
    this.getWorkshops();
  }

}
