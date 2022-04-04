import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  form: FormGroup;
  editMode: string;

  constructor(
    private server: ServerService,
    private route: ActivatedRoute,
    private router: Router) { }

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
    document.getElementById("LI").setAttribute("class", "hideListItem");
    document.getElementById("REG").setAttribute("class", "hideListItem");
    document.getElementById("LO").setAttribute("class", "showListItem");
    const fixedMenu = document.getElementsByClassName("menu");
    for (let i = 0; i < fixedMenu.length; i++) {
      fixedMenu[i].setAttribute("style", "display:inline;");
    }
  }

  saveWorkshop() {
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
  }

}
