import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarDepDragComponent } from './asignar-dep-drag.component';

describe('AsignarDepDragComponent', () => {
  let component: AsignarDepDragComponent;
  let fixture: ComponentFixture<AsignarDepDragComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarDepDragComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarDepDragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
