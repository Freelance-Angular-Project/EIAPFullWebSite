import { Component } from '@angular/core';
import { SchoolService } from '../../../../../Services/School/school.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { School } from '../../../../../Models/Schools/school';

@Component({
  selector: 'app-edit-school',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-school.component.html',
  styleUrl: './edit-school.component.scss',
})
export class EditSchoolComponent {
  school: School = {} as School; // Assuming you have a class or interface named School
  id: string = '';

  constructor(
    private schoolService: SchoolService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('ID') || '';
    if (this.id) {
      // Assuming you have a method to fetch a school by ID
      this.schoolService.getSchoolById(this.id).subscribe({
        next: (data) => {
          this.school = data;
          console.log(this.school);
        },
        error: (err) => console.error(err),
      });
    }
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.schoolService.updateSchool(this.school).subscribe({
        next: (updatedSchool) => {
          console.log('School updated:', updatedSchool);
          this.router.navigate(['/GetSchools']);
        },
        error: (error) => console.error(error),
      });
    }
  }
}
