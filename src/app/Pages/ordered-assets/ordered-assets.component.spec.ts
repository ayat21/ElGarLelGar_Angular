import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedAssetsComponent } from './ordered-assets.component';

describe('OrderedAssetsComponent', () => {
  let component: OrderedAssetsComponent;
  let fixture: ComponentFixture<OrderedAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderedAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
