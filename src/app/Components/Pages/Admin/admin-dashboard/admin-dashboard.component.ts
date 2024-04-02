import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControlOptions,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../../Services/User/user.service';
import { Account } from '../../../../Models/account';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../../Services/Toast/toast.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    public toastService: ToastService
  ) {}
  accountForm!: FormGroup;
  account!: Account; // This will hold the account data
  Roles: string[] = [
    'Admin',
    'Investigated',
    'ProjectManager',
    'SchoolManager',
  ];

  ngOnInit() {
    this.accountForm = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
        gender: ['-1', Validators.required],
        Role: ['0', [Validators.required]],
      },
      { validator: this.checkPasswords } as FormControlOptions
    );
  }

  // Custom validator to check if password and confirmPassword match
  checkPasswords(group: FormGroup) {
    const password = group.get('password')!.value;
    const confirmPassword = group.get('confirmPassword')!.value;
    return password === confirmPassword ? null : { notSame: true };
  }

  // Function to submit form
  onSubmit() {
    if (this.accountForm.valid) {
      // Populate the account object with form values
      this.account = {
        fullName: this.accountForm.value.fullName,
        email: this.accountForm.value.email,
        password: this.accountForm.value.password,
        confirmPassword: this.accountForm.value.confirmPassword,
        phoneNumber: this.accountForm.value.phoneNumber,
        gender: +this.accountForm.value.gender,
      };
      console.log('Account Data:', this.account);
      const selectedRole = this.accountForm.get('Role')!.value;
      console.log(selectedRole);

      switch (selectedRole) {
        case 'Admin':
          this.userService.registerAdmin(this.account).subscribe({
            next: (response) => {
              //console.log(response)
              this.toastService.show(
                'Admin has been successfully created.',
                false
              );
            },
            error: (err) => {
              //console.log(err)
              this.toastService.show(
                'Error while create Admin Account check your inputs',
                true
              );
            },
          });
          break;
        case 'ProjectManager':
          this.userService.registerProjectManager(this.account).subscribe({
            next: (response) => {
              //console.log(response)
              this.toastService.show(
                'Project Manager has been successfully created.',
                false
              );
            },
            error: (err) => {
              //console.log(err)
              this.toastService.show(
                'Error while create Project Manager Account check your inputs',
                true
              );
            },
          });
          break;

        case 'Investigated':
          this.userService.registerInvestigated(this.account).subscribe({
            next: (response) => {
              //console.log(response)
              this.toastService.show(
                'Investigator has been successfully created.',
                false
              );
            },
            error: (err) => {
              //console.log(err)
              this.toastService.show(
                'Error while create Investigator Account check your inputs',
                true
              );
            },
          });
          break;

        case 'SchoolManager':
          this.userService.registerSchoolManager(this.account).subscribe({
            next: (response) => {
              //console.log(response)
              this.toastService.show(
                'School Manager has been successfully created.',
                false
              );
            },
            error: (err) => {
              //console.log(err)
              this.toastService.show(
                'Error while create School Manager Account check your inputs',
                true
              );
            },
          });
          break;
        default:
        //console.log('No service action defined for this role');
      }

      this.accountForm.reset({
        fullName: '', // Specify default values
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        gender: -1,
        Role: '', // Make sure the default values match the structure of your form
      });
    }
  }
}
