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
    this.getParticipants();
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
    this.router.navigate([`/participant/2/${participant.id}`]);
  }
}
