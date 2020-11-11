import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedSkillsComponent } from './ordered-skills.component';

describe('OrderedSkillsComponent', () => {
  let component: OrderedSkillsComponent;
  let fixture: ComponentFixture<OrderedSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderedSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
