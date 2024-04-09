import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../../../../Services/School/school.service';
import { ActivatedRoute, Router } from '@angular/router';
import { School } from '../../../../../Models/school';

@Component({
  selector: 'app-school-details',
  standalone: true,
  imports: [],
  templateUrl: './school-details.component.html',
  styleUrl: './school-details.component.scss',
})
export class SchoolDetailsComponent implements OnInit {
  schoolurlId: string = '';
  schooldetails: School = {} as School;
  constructor(
    private schoolservice: SchoolService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.schoolurlId =
      this.activatedRoute.snapshot.paramMap.get('schoolID') || '';

    this.schoolservice.getSchoolById(this.schoolurlId).subscribe({
      next: (school) => {
          this.schooldetails = school;

      },
      error: (err) => {
        this.router.navigate(['**']);

      },
    });
  }
  goBack() {
    this.router.navigate(['/GetSchools']);
  }
}
