import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsBasedOnRolesComponent } from './accounts-based-on-roles.component';

describe('AccountsBasedOnRolesComponent', () => {
  let component: AccountsBasedOnRolesComponent;
  let fixture: ComponentFixture<AccountsBasedOnRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountsBasedOnRolesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountsBasedOnRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
