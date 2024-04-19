import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSchoolsComponent } from './get-schools.component';

describe('GetSchoolsComponent', () => {
  let component: GetSchoolsComponent;
  let fixture: ComponentFixture<GetSchoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetSchoolsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetSchoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
