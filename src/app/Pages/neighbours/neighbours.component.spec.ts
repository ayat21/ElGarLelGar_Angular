import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeighboursComponent } from './neighbours.component';

describe('NeighboursComponent', () => {
  let component: NeighboursComponent;
  let fixture: ComponentFixture<NeighboursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeighboursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeighboursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
