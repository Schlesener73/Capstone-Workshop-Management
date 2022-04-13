import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AddEquipmentComponent } from './add-equipment.component';

describe('AddEquipmentComponent', () => {

  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEquipmentComponent ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule
      ]
    })
    .compileComponents();

    //router = TestBed.get(Router);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AddEquipmentComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
