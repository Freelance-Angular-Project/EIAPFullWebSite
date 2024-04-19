import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessTicketPopupComponent } from './success-ticket-popup.component';

describe('SuccessTicketPopupComponent', () => {
  let component: SuccessTicketPopupComponent;
  let fixture: ComponentFixture<SuccessTicketPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessTicketPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuccessTicketPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
