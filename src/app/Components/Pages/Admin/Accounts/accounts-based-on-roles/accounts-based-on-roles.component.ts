import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../../Services/User/user.service';
import { Role } from '../../../../../Models/role';

@Component({
  selector: 'app-accounts-based-on-roles',
  standalone: true,
  imports: [FormsModule],
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
  constructor(private userservice: UserService,){}
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
}
