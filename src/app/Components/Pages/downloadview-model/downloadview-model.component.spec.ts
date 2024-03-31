import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadviewModelComponent } from './downloadview-model.component';

describe('DownloadviewModelComponent', () => {
  let component: DownloadviewModelComponent;
  let fixture: ComponentFixture<DownloadviewModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadviewModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DownloadviewModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
