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
    this.setNavigation();
    this.getEquipment();
  }

  setNavigation() {
    document.getElementById("AW").setAttribute("class", "hideListItem");
    document.getElementById("EW").setAttribute("class", "hideListItem");
    document.getElementById("AP").setAttribute("class", "hideListItem");
    document.getElementById("EP").setAttribute("class", "hideListItem");
    document.getElementById("AE").setAttribute("class", "showListItem");
    document.getElementById("AEh").setAttribute("href", `/new-equipment/-1`);
    document.getElementById("EE").setAttribute("class", "hideListItem");
    document.getElementById("LI").setAttribute("class", "hideListItem");
    document.getElementById("REG").setAttribute("class", "hideListItem");
    document.getElementById("LO").setAttribute("class", "showListItem");
    const fixedMenu = document.getElementsByClassName("menu");
    for (let i = 0; i < fixedMenu.length; i++) {
      fixedMenu[i].setAttribute("style", "display:inline;");
    }
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
    this.router.navigate([`/equipment/${equipment.id}`]);
  }

}
