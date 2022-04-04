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
    this.setNavigation();
    this.getWorkshops();
  }

  setNavigation() {
    document.getElementById("AW").setAttribute("class", "showListItem");
    document.getElementById("EW").setAttribute("class", "hideListItem");
    document.getElementById("AP").setAttribute("class", "hideListItem");
    document.getElementById("EP").setAttribute("class", "hideListItem");
    document.getElementById("AE").setAttribute("class", "hideListItem");
    document.getElementById("EE").setAttribute("class", "hideListItem");
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

  viewWorkshop(workshop) {
    this.router.navigate([`/workshop/${workshop.id}`]);
  }

  setSelection(event: any) {
    this.showDates = event.target.value;
    this.getWorkshops();
  }

}
