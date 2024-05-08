import { Component, HostListener } from '@angular/core';
import { School } from '../../../../Models/Schools/school';
import { SchoolService } from '../../../../Services/School/school.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChartData, ChartType } from 'chart.js';

import { ProjectInSchool } from '../../../../Models/Projects/project-in-school';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schooldashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NgChartsModule, FormsModule],
  templateUrl: './schooldashboard.component.html',
  styleUrl: './schooldashboard.component.scss',
})
export class SchooldashboardComponent {
  school: School = {} as School;
  currentSchoolManID: string = '';
  userId: string | null = null;
  isAuthorized: boolean | null = null;
  showModel: boolean = false;

  // next,prev
  displayedProjectInSchool: ProjectInSchool[] | null = null;
  currentIndex: number = 0;
  lastIndexProjectInSchool: number = 0;
  itemsPerPage = 3; // Default value for large screens

  // charts
  // pie
  public pieChartType: ChartType = 'pie';
  public pieChartData: ChartData<'pie'> = {
    labels: ['Completed', 'Not Completed'],
    datasets: [
      {
        data: [],
        backgroundColor: ['#5cc4cb', '#fbdb53'], // Colors for completed and not completed
      },
    ],
  };

  constructor(
    private schoolService: SchoolService,
    private httpclient: HttpClient
  ) {}

  ngOnInit(): void {
    // this.userId = this.userService.getCurrentUserId();
    // console.log(this.userId);

    // const r=(localStorage.getItem("role")=="SchoolManager")?true:false;
    // const t=(localStorage.getItem("token"))?true:false;

    // *********
    // this.isAuthorized = this.schoolService.isUserAuthorized();
    // console.log(this.isAuthorized);

    // if(r&&t){
    // if(this.isAuthorized){
    // this.userService.getUsersInRole('SchoolManager').subscribe({
    //   next: (data) => {
    //     console.log(data);

    //   },
    //   error: (err) => {
    //     console.log('school id error', err);
    //   },
    // });
    this.schoolService.getOneSchool().subscribe({
      next: (data) => {
        this.school = data;
        this.displayedProjectInSchool = this.school.projects;
        this.lastIndexProjectInSchool = this.school.projects.length;
        this.updateDisplayedNews();
        // charts
        const Completed =
          data.projects.filter((project) => project.taskCompletePercentage)
            .length + 40;
        const notCompleted = 100 - Completed;
        this.pieChartData.datasets[0].data = [Completed, notCompleted];
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
    // this.schoolService.getSchoolById(this.userId).subscribe({
    //   next: (data) => {
    //     this.school = data;
    //   },
    //   error: (error) => {
    //     console.error('There was an error!', error);
    //   }
    // });
    // }

    this.adjustItemsPerScreen();
  }

  // move to another school component
  // showModel1(){
  //   this.showModel=true;
  // }
  // hideModel(){
  //   this.showModel=false;
  // }
  // #########################
  downloadFile(fileName: string) {
    // if(id){
    const downloadUrl = fileName;
    this.httpclient.get(downloadUrl, { responseType: 'blob' }).subscribe({
      next: (response: Blob) => {
        const blob = new Blob([response], { type: response.type });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.log('error in download', err);
      },
    });
    // }
  }

  // Complete Handling Next And Pervious
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustItemsPerScreen();
  }

  private adjustItemsPerScreen(): void {
    this.itemsPerPage = window.innerWidth <= 786 ? 1 : 3;  // Adjust if necessary
    this.updateDisplayedNews();
  }

  next(): void {
    if (this.currentIndex < this.school.projects.length - this.itemsPerPage) {
      this.currentIndex += this.itemsPerPage;
      this.updateDisplayedNews();
    }
  }

  previous(): void {
    if (this.currentIndex > 0) {
      this.currentIndex -= this.itemsPerPage;
      this.updateDisplayedNews();
    }
  }

  private updateDisplayedNews(): void {
    this.displayedProjectInSchool = this.school.projects.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);
  }


  //update Data School
  editMode = false;

toggleEditMode() {
  this.editMode = !this.editMode;
}

saveUpdates() {
  if (this.editMode && this.school) { // Check if edit mode is active and school is defined
    this.schoolService.updateSchool(this.school).subscribe({
      next: (school) => {
        console.log('Saving updates:', school);
        this.toggleEditMode();
      },
      error: (error) => {
        console.error('Error status:', error.status);
        console.error('Error details:', error.error);
      },
    });
  }
}


}
