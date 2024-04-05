import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../../../Services/School/school.service';
import { School } from '../../../../Models/school';

@Component({
  selector: 'app-get-schools',
  standalone: true,
  imports: [],
  templateUrl: './get-schools.component.html',
  styleUrl: './get-schools.component.scss'
})
export class GetSchoolsComponent implements OnInit {
  schools:School[] = [];
constructor(private schoolservice:SchoolService){}
  ngOnInit(): void {

    this.schoolservice.getAllSchools().subscribe({
      next:(allschools)=>{
        // console.log(allschools);
        this.schools=allschools;

      },
      error:(errors)=>{
        console.log(errors);

      }
    })
  }
}
