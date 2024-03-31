import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { DownloadviewModelComponent } from '../../downloadview-model/downloadview-model.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SchoolService } from '../../../../Services/School/school.service';
import { ProjectInSchool } from '../../../../Models/project-in-school';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../../Services/Task/task.service';
import { TaskDetails } from '../../../../Models/task-details';
import { HttpClient } from '@angular/common/http';
import { FilesService } from '../../../../Services/Files/files.service';
import { FormsModule } from '@angular/forms';
import { Uploadfile } from '../../../../Models/uploadfile';
import { School } from '../../../../Models/school';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { AddAssignment } from '../../../../Models/add-assignment';
import { AssignmentFileService } from '../../../../Services/Assignments/assignment-file.service';

@Component({
  selector: 'app-schooldashboardtasks',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, NgChartsModule],
  templateUrl: './schooldashboardtasks.component.html',
  styleUrl: './schooldashboardtasks.component.scss',
})
export class SchooldashboardtasksComponent implements OnInit {
  school: School = {} as School;

  currentProjectID: string = '';
  schoolProject: ProjectInSchool = {} as ProjectInSchool;
  showModel: boolean = false;
  CurrentTaskId: string = '';
  currentTask: TaskDetails = {} as TaskDetails;
  selectedFile: File | null = null;
  // pie
  // Pie chart configuration
  public pieChartOptions: ChartOptions = {
    responsive: true,
    // Add any specific options you need
  };
  public pieChartType: ChartType = 'pie';
  public pieChartData: ChartData<'pie'> = {
    labels: ['Completed', 'Not Completed'],
    datasets: [
      {
        data: [],
        backgroundColor: ['#4791ff', '#fbdb54'], // Colors for completed and not completed
      },
    ],
  };
  constructor(
    private activatedrouter: ActivatedRoute,
    private schoolservice: SchoolService,
    private taskService: TaskService,
    private httpclient: HttpClient,
    private fileService: FilesService,
    private schoolService: SchoolService,
    private router: Router,
    private assignmentsfile:AssignmentFileService
  ) {}

  ngOnInit(): void {
    this.activatedrouter.paramMap.subscribe((param) => {
      this.currentProjectID = param.get('schoolid')
        ? String(param.get('schoolid'))
        : '';
      this.schoolservice
        .getProjectWithtaskstoschool(this.currentProjectID)
        .subscribe({
          next: (project) => {
            this.schoolProject = project;
            // charts
            const completed = project.taskCompletePercentage + 60;
            const notcompleted = 100 - completed;
            this.pieChartData.datasets[0].data = [completed, notcompleted];
            this.pieChartData.datasets = [...this.pieChartData.datasets];
          },
          error: (err) => {
            console.log('error in project', err);
          },
        });
    });
    this.schoolService.getOneSchool().subscribe({
      next: (data) => {
        this.school = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }
  showModel1(taskid: string) {
    if (taskid) {
      this.showModel = true;
      this.CurrentTaskId = taskid;
      this.schoolService.GetTaskDetailsToSchool(this.CurrentTaskId).subscribe({
        next: (taskDetails) => {
          console.log(taskDetails);
          this.currentTask = taskDetails;

        },
        error:(error)=>{console.log(error);
        }
      })
      //Old error logic
      // this.taskService.getTaskById(this.CurrentTaskId).subscribe({
      //   next: (task) => {
      //     // console.log(task);
      //     this.currentTask = task;

      //   },
      //   error: (err) => {
      //     console.log(err);
      //   },
      // });
      // console.log(this.CurrentTaskId);
    }
  }
  hideModel() {
    this.showModel = false;
  }

  downloadFile(fileName: string) {
    // if(id){
    const downloadUrl = fileName;
    this.httpclient
      .get(downloadUrl, { responseType: 'blob' })
      .subscribe((response: Blob) => {
        const blob = new Blob([response], { type: response.type });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      });
    // }
  }

  //   if (this.model.File) {
  //    this.model= {
  //       TaskId: this.currentTask.id,
  //       ProjectId: this.schoolProject.id,
  //       schoolId: this.school.id,
  //       Name: '',
  //       Description: '',
  //       EndDate: new Date('2024-01-01T00:00:00'),
  //       IsPublic: true,
  //       File: undefined,
  //     };

  uploadImage(event: any) {}
  // model: Uploadfile = {} as Uploadfile;
  model: AddAssignment = {} as AddAssignment;

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.model.File = event.target.files[0];
    }
  }

  onSubmit() {
    this.model.TaskId = this.currentTask.id;
    // this.model.ProjectId = this.schoolProject.id;
    // this.model.schoolId = this.school.id;
    // this.model.IsPublic = true;
    const formData = new FormData();
    Object.keys(this.model).forEach((key) => {
      const value = this.model[key];
      if (value === undefined) {
        // If your backend can handle empty strings for missing values,
        // you can uncomment the next line; otherwise, just skip appending.
        // formData.append(key, '');
        return; // Skip appending undefined values
      }

      if (value instanceof File) {
        formData.append(key, value, value.name);
      } else {
        // This case handles numbers and other serializable types.
        // Convert them to string to ensure type safety.
        formData.append(key, String(value));
      }
    });

    console.log(this.model);

    this.assignmentsfile.uploadFile(formData).subscribe({
      next: (response) => {
        console.log('Upload successful', response);
        this.router.navigate(['/SchoolDashboard']);
        // this.location.back();
      },
      error: (error) => console.error('Error uploading file', error),
    });
  }
}
