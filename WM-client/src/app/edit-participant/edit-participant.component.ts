import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-participant',
  templateUrl: './edit-participant.component.html',
  styleUrls: ['./edit-participant.component.css']
})
export class EditParticipantComponent implements OnInit {
  participant = null;
  form: FormGroup;
  source = this.route.snapshot.params.source;

  constructor(
    private server: ServerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getParticipant();
  }

  getParticipant() {
    this.server.getParticipant(this.route.snapshot.params.id)
      .subscribe(
        result => {
          this.participant = result[0];
          console.log(result);
        },
        error => {
          console.log(error);
        }
      );
  }

  saveParticipant() {
    this.server.updateParticipant(this.route.snapshot.params.id, this.participant)
      .subscribe(
        response => {
          console.log(response);
          if (this.participant.workshop_id == null)
            this.router.navigate([`/participants`]);
          else
            this.router.navigate([`/participant/${this.source}/${this.participant.id}`]);
        },
        error => {
          console.log(error);
        }
      );
  }

}
