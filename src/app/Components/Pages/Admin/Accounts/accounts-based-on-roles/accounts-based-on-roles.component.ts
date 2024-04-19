import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../../Services/User/user.service';
import { Role } from '../../../../../Models/Accounts/role';
import { Router, RouterModule } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-accounts-based-on-roles',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './accounts-based-on-roles.component.html',
  styleUrl: './accounts-based-on-roles.component.scss'
})
export class AccountsBasedOnRolesComponent implements OnInit {
  Roles: string[] = [
    'Admin',
    'Investigated',
    'ProjectManager',
    'SchoolManager',
  ];

  selectedRole:string='';
  users:Role[] = [];
  selectedUserId:string = '';
  constructor(private userservice: UserService,private router: Router){}
  ngOnInit(): void {
    // this.userservice.getUsersInRole(this.selectedRole).subscribe({
    //   next: (user) => {
    //     console.log(user);
    //     this.users = user;
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
  }
  onRoleChange(newRole: string): void {
    this.selectedRole = newRole;
    if (!this.selectedRole) {
      return;
    }

    this.userservice.getUsersInRole(this.selectedRole).subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  openConfirmModal(): void {
    const confirmModal = new bootstrap.Modal(
      document.getElementById('confirmDeleteModal'),
      {
        keyboard: false,
      }
    );
    confirmModal.show();
  }
  selectUser(userId: string) {
    this.selectedUserId = userId;
  }
  reloadComponent() {
    // Navigate away and back to the current route
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  deleteSchool() {
    if (this.selectedUserId) {
      this.userservice.deleteAccount(this.selectedUserId).subscribe({
        next: (data) => {
          const confirmModal = bootstrap.Modal.getInstance(
            document.getElementById('confirmDeleteModal')
          );
          confirmModal.hide();
          this.reloadComponent();
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log('No User selected for deletion');
    }
  }
}
