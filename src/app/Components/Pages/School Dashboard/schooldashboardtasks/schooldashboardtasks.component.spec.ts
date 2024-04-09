import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchooldashboardtasksComponent } from './schooldashboardtasks.component';

describe('SchooldashboardtasksComponent', () => {
  let component: SchooldashboardtasksComponent;
  let fixture: ComponentFixture<SchooldashboardtasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchooldashboardtasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchooldashboardtasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
