import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { String2ampmPipe } from '../convert2ampm.pipe';
import { PhonePipe } from '../phone.pipe';

import { ViewWorkshopComponent } from './view-workshop.component';

describe('ViewWorkshopComponent', () => {
  let component: ViewWorkshopComponent;
  let fixture: ComponentFixture<ViewWorkshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      declarations: [ 
        ViewWorkshopComponent,
        String2ampmPipe,
        PhonePipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
