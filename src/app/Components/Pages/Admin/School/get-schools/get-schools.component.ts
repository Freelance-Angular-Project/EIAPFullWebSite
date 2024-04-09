import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../../../../Services/School/school.service';
import { School } from '../../../../../Models/school';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;
@Component({
  selector: 'app-get-schools',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './get-schools.component.html',
  styleUrl: './get-schools.component.scss',
})
export class GetSchoolsComponent implements OnInit {
  schools: School[] = [];
  filteredSchools: School[] = [];
  filter: string = '';
  selectedSchoolId: string | null = null;
  constructor(private schoolservice: SchoolService, private router: Router) {}
  ngOnInit(): void {
    this.schoolservice.getAllSchools().subscribe({
      next: (allschools) => {
        // console.log(allschools);
        this.schools = allschools;
        this.filteredSchools = allschools;
      },
      error: (errors) => {
        console.log(errors);
      },
    });
  }
  goSchoolDetails(schoolid: string) {
    this.router.navigate(['/GetSchoolDetails', schoolid]);
  }
  onFilterChange() {
    this.filteredSchools = this.schools.filter((school) =>
      school.name.toLowerCase().includes(this.filter.toLowerCase())
    );
    console.log(this.filteredSchools);
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
  selectSchool(schoolId: string) {
    this.selectedSchoolId = schoolId;
  }
  reloadComponent() {
    // Navigate away and back to the current route
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  deleteSchool() {
    if (this.selectedSchoolId) {
      this.schoolservice.deleteSchool(this.selectedSchoolId).subscribe({
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
      console.log('No school selected for deletion');
    }
  }
}
