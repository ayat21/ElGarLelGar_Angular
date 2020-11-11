import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllassetsComponent } from './allassets.component';

describe('AllassetsComponent', () => {
  let component: AllassetsComponent;
  let fixture: ComponentFixture<AllassetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllassetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllassetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
