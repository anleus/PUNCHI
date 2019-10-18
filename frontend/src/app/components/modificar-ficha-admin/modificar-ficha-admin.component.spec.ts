import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarFichaAdminComponent } from './modificar-ficha-admin.component';

describe('ModificarFichaAdminComponent', () => {
  let component: ModificarFichaAdminComponent;
  let fixture: ComponentFixture<ModificarFichaAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarFichaAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarFichaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
