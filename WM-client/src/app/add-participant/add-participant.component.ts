import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/server.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.css']
})
export class AddParticipantComponent implements OnInit {
  participant = {
    first_name: '',
    last_name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    phone: '',
    workshop_id: this.route.snapshot.params.workshopID
  };

  constructor(
    private server: ServerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  createParticipant() {
    const data = {
      first_name: this.participant.first_name,
      last_name: this.participant.last_name,
      address: this.participant.address,
      city: this.participant.city,
      state: this.participant.state,
      zip: this.participant.zip,
      email: this.participant.email,
      phone: this.participant.phone
    };

    this.server.addParticipant(data, this.participant.workshop_id)
      .subscribe(
        response => {
          console.log(response);
          this.server.updateWorkshopCount(this.participant.workshop_id, data)
          .subscribe(
            response => {
              console.log(response);
              if (this.participant.workshop_id == 0)
                this.router.navigate([`/participants}`]);
              else
                this.router.navigate([`/workshop/${this.participant.workshop_id}`]);
            },
            error => {
              console.log(error);
            }
          );
        },
        error => {
          console.log(error);
        }
      );

  }

}
