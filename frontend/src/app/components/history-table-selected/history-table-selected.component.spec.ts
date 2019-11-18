import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTableSelectedComponent } from './history-table-selected.component';

describe('HistoryTableSelectedComponent', () => {
  let component: HistoryTableSelectedComponent;
  let fixture: ComponentFixture<HistoryTableSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryTableSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryTableSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
