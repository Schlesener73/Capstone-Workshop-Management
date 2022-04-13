import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { String2ampmPipe } from '../convert2ampm.pipe';

import { EditParticipantComponent } from './edit-participant.component';

describe('EditParticipantComponent', () => {
  let component: EditParticipantComponent;
  let fixture: ComponentFixture<EditParticipantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditParticipantComponent,
        String2ampmPipe
       ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
