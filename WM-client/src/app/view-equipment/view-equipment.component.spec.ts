import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { String2ampmPipe } from '../convert2ampm.pipe';
import { PhonePipe } from '../phone.pipe';

import { ViewEquipmentComponent } from './view-equipment.component';

describe('ViewEquipmentComponent', () => {
  let component: ViewEquipmentComponent;
  let fixture: ComponentFixture<ViewEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      declarations: [
        ViewEquipmentComponent,
        String2ampmPipe,
        PhonePipe
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
