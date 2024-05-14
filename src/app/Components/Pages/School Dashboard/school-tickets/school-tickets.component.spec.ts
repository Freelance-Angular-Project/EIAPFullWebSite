import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolTicketsComponent } from './school-tickets.component';

describe('SchoolTicketsComponent', () => {
  let component: SchoolTicketsComponent;
  let fixture: ComponentFixture<SchoolTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolTicketsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchoolTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
