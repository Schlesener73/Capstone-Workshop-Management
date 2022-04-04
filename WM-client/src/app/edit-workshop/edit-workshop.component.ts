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
    this.setNavigation();
    this.getWorkshop();
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
    this.server.updateWorkshop(this.route.snapshot.params.id, this.workshop)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate([`/workshop/${this.route.snapshot.params.id}`]);
        },
        error => {
          console.log(error);
        }
      );
  }

}
