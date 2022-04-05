import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { WorkshopsComponent } from './workshops.component';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';

@Pipe({name: 'string2ampm'})
class MockPipe implements PipeTransform {
    transform(value: number): number {
        //Do stuff here, if you want
        return value;
    }
}

const routerSpy = jasmine.createSpyObj(
  'Router',
  ['navigate']
);

describe('WorkshopsComponent', () => {
  let component: WorkshopsComponent;
  let fixture: ComponentFixture<WorkshopsComponent>;

  let serverServiceStub: Partial<ServerService>;

  serverServiceStub = {

  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      declarations: [ WorkshopsComponent, MockPipe ],
      providers: [
        { provide: ServerService, useValue: serverServiceStub },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
