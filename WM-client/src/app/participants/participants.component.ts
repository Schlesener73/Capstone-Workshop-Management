import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {

  participants: any[] = [];
  
  constructor(private server: ServerService,
    private router: Router) { }

  ngOnInit() {
    this.setNavigation();
    this.getParticipants();
  }

  setNavigation() {
    document.getElementById("AW").setAttribute("class", "hideListItem");
    document.getElementById("EW").setAttribute("class", "hideListItem");
    document.getElementById("AP").setAttribute("class", "showListItem");
    document.getElementById("APh").setAttribute("href", `/new-participant/-1`);
    document.getElementById("EP").setAttribute("class", "hideListItem");
    document.getElementById("AE").setAttribute("class", "hideListItem");
    document.getElementById("AE").setAttribute("class", "hideListItem");
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

  viewParticipant(participant) {
    this.router.navigate([`/participant/${participant.id}`]);
  }
}
