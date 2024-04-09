import { Component, OnInit } from '@angular/core';
import { UpdateAccount } from '../../../../../Models/update-account';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../../Services/User/user.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss',
})
export class UpdateUserComponent implements OnInit {
  UpdateAccount: UpdateAccount = {} as UpdateAccount; // Assuming you have a class or interface named School
  selectedRole: string = '';
  id :string = '';
  accountList : UpdateAccount[] = [];
  constructor(
    private UserService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    // Assuming you have a method to fetch a school by ID
    this.id = this.route.snapshot.paramMap.get('id') || '';

    this.selectedRole = this.route.snapshot.paramMap.get('selectedRole') || '';

    if (this.selectedRole) {
    this.UserService.getUsersInRole(this.selectedRole).subscribe({
      next: (data) => {
        this.accountList = data;
        if(this.accountList.length > 0)
          {
            const foundAccount = this.accountList.find(account => account.id === this.id);
            if(foundAccount !== undefined)
              {
                this.UpdateAccount = foundAccount;

              }
          }

      },
      error: (err) => console.error(err),
    });
  }
}
  onSubmit(form: NgForm): void {
    if (form.valid) {

      this.UserService.updateAccount(this.UpdateAccount).subscribe({
        next: (updatedSchool) => {
          this.router.navigate(['/GetAccounts']);

        },
        error: (error) => {console.error(error);
          console.log(this.UpdateAccount);

        },
      });
    }
  }


}
