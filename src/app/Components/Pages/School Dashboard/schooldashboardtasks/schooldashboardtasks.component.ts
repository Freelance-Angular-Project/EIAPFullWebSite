import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SchoolService } from '../../../../Services/School/school.service';
import { ProjectInSchool } from '../../../../Models/Projects/project-in-school';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../../Services/Task/task.service';
import { TaskDetails } from '../../../../Models/Tasks/task-details';
import { HttpClient } from '@angular/common/http';
import { FilesService } from '../../../../Services/Files/files.service';
import { FormsModule } from '@angular/forms';
import { School } from '../../../../Models/Schools/school';
import { NgChartsModule } from 'ng2-charts';
import { Chart } from 'chart.js';
import { AddAssignment } from '../../../../Models/Assignments/add-assignment';
import { AssignmentFileService } from '../../../../Services/Assignments/assignment-file.service';

@Component({
  selector: 'app-schooldashboardtasks',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, NgChartsModule],
  templateUrl: './schooldashboardtasks.component.html',
  styleUrl: './schooldashboardtasks.component.scss',
})
export class SchooldashboardtasksComponent implements OnInit, AfterViewInit {
  school: School = {} as School;

  currentProjectID: string = '';
  schoolProject: ProjectInSchool = {} as ProjectInSchool;
  showModel: boolean = false;
  CurrentTaskId: string = '';
  currentTask: TaskDetails = {} as TaskDetails;
  selectedFile: File | null = null;
  assignmentofzerostatus: string = '';
  // form file input check
  fileTouched = false;
  fileInvalid = false;
  // chart
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  // loader when upload
  isUploading: boolean = false;
  private chart: Chart<'pie', number[], string> | undefined;

  constructor(
    private activatedrouter: ActivatedRoute,
    private schoolservice: SchoolService,
    private httpclient: HttpClient,
    private schoolService: SchoolService,
    private router: Router,
    private assignmentsfile: AssignmentFileService
  ) {}
  ngAfterViewInit(): void {
    this.initializeChart();
  }

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
            this.updateChart([completed, notcompleted]);
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

    // this.assignmentofzerostatus=this.currentTask.assignments[0].status;
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
        error: (error) => {
          console.log(error);
        },
      });
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
      this.fileTouched = true;
      this.fileInvalid = false;
    } else {
      this.fileInvalid = true; // No file selected
    }
  }

  onSubmit() {
    this.isUploading = true;
    this.model.TaskId = this.currentTask.id;
    // this.model.ProjectId = this.schoolProject.id;
    // this.model.schoolId = this.school.id;
    // this.model.IsPublic = true;
    const formData = new FormData();
    Object.keys(this.model).forEach((key) => {
      const value = this.model[key];
      if (value === undefined) {
        return; // Skip appending undefined values
      }

      if (value instanceof File) {
        formData.append(key, value, value.name);
      } else {
        formData.append(key, String(value));
      }
    });

    console.log(this.model);

    this.assignmentsfile.uploadFile(formData).subscribe({
      next: (response) => {
        console.log('Upload successful', response);
        this.router.navigate(['/SchoolDashboardTask', this.schoolProject.id]);
        this.showModel = false;
        // this.location.back();
        this.isUploading = false;
      },
      error: (error) => {
        console.error('Error uploading file', error);
        this.isUploading = false;
      },
    });
  }

  initializeChart() {
    if (!this.chartCanvas) return; // Guard clause if chartCanvas is not available

    const context = this.chartCanvas.nativeElement.getContext('2d');
    if (context) {
      // Initialize the chart using the context
      this.chart = new Chart(context, {
        type: 'pie',
        data: {
          labels: ['Completed', 'Not Completed'],
          datasets: [
            {
              data: [], // Example data
              backgroundColor: ['#4791ff', '#fbdb54'],
            },
          ],
        },
        options: {
          responsive: true,
          // Try initially without animation to see if the error is related to it
          maintainAspectRatio: false,
        },
      });
    } else {
      console.error('Failed to get canvas context');
    }
  }

  updateChart(data: number[]) {
    if (this.chart) {
      this.chart.data.datasets[0].data = data;
      this.chart.update();
    }
  }
}
