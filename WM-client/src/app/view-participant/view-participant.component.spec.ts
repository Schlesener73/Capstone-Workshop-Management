import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { String2ampmPipe } from '../convert2ampm.pipe';
import { PhonePipe } from '../phone.pipe';

import { ViewParticipantComponent } from './view-participant.component';

describe('ViewParticipantComponent', () => {
  let component: ViewParticipantComponent;
  let fixture: ComponentFixture<ViewParticipantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      declarations: [ 
        ViewParticipantComponent,
        String2ampmPipe,
        PhonePipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
