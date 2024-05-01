import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskNoteComponent } from './add-task-note.component';

describe('AddTaskNoteComponent', () => {
  let component: AddTaskNoteComponent;
  let fixture: ComponentFixture<AddTaskNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTaskNoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTaskNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
