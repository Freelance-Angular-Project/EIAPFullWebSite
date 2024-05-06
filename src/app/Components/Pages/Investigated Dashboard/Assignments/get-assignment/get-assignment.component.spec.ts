import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAssignmentComponent } from './get-assignment.component';

describe('GetAssignmentComponent', () => {
  let component: GetAssignmentComponent;
  let fixture: ComponentFixture<GetAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAssignmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
