import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarDepComponent } from './asignar-dep.component';

describe('AsignarDepComponent', () => {
  let component: AsignarDepComponent;
  let fixture: ComponentFixture<AsignarDepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarDepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarDepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
