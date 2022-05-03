import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ServerService } from '../server.service';
import { Observable, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { String2ampmPipe } from '../convert2ampm.pipe';
import { PhonePipe } from '../phone.pipe';

import { ViewWorkshopComponent } from './view-workshop.component';

describe('ViewWorkshopComponent', () => {
  let component: ViewWorkshopComponent;
  let fixture: ComponentFixture<ViewWorkshopComponent>;
  let fakeServerService: ServerService;

  beforeEach(async() => {
    var workshop = [{
      id: 1,
      start: '2022-01-01',
      end: '2022-12-31',
      meet: '12:00',
      location: 'IUS',
      numofpart: 1,
      frequency: 'MWF'
    }];
    var participants = [{
      id: 1,
      first_name: 'Will',
      last_name: 'Schlesener',
      address: '1590 Glenn Ellen Drive',
      city: 'Gridley',
      state: 'CA',
      zip: '95948',
      email: 'will@gmail.com',
      phone: '5308462657',
      workshop_id: '1'
    }];
    var equipment = [{
      id: 1,
      name: 'dev1',
      storage_loc: 'loc1',
      year: 2022,
      image: 'dev-123.jpg',
      eq_condition: 'new',
      participant_id: '1'
    }];

    const fakeServerService = jasmine.createSpyObj<ServerService>(
      'ServerService',
      {
        getWorkshop: of(workshop),
        viewWorkshop: of(participants),
        getWorkshopEquip: of(equipment),
      }
    );

    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      declarations: [ 
        ViewWorkshopComponent,
        String2ampmPipe,
        PhonePipe
      ],
      providers: [
        { provide: ServerService, useValue: fakeServerService }
      ]
    })
    .compileComponents();
 
    fixture = TestBed.createComponent(ViewWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
