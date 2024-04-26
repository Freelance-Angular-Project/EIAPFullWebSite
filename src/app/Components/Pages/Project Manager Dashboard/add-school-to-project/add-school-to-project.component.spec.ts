import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSchoolToProjectComponent } from './add-school-to-project.component';

describe('AddSchoolToProjectComponent', () => {
  let component: AddSchoolToProjectComponent;
  let fixture: ComponentFixture<AddSchoolToProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSchoolToProjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSchoolToProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
