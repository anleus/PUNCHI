import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizarDepartamentoComponent } from './personalizar-departamento.component';

describe('PersonalizarDepartamentoComponent', () => {
  let component: PersonalizarDepartamentoComponent;
  let fixture: ComponentFixture<PersonalizarDepartamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalizarDepartamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalizarDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
