import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWorkshopComponent } from './view-workshop.component';

describe('ViewWorkshopComponent', () => {
  let component: ViewWorkshopComponent;
  let fixture: ComponentFixture<ViewWorkshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewWorkshopComponent ]
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
