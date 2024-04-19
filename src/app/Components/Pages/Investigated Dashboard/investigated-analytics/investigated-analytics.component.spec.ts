import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigatedAnalyticsComponent } from './investigated-analytics.component';

describe('InvestigatedAnalyticsComponent', () => {
  let component: InvestigatedAnalyticsComponent;
  let fixture: ComponentFixture<InvestigatedAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestigatedAnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvestigatedAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
