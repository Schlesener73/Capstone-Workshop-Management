import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  pages = [
    { 'url': 'workshops',
      'text': 'WORKSHOPS'
    },
    {
      'url': 'participants',
      'text': 'PARTICIPANTS'
    },
    {
      'url': 'equipment',
      'text': 'EQUIPMENT'
    }
  ]
}
