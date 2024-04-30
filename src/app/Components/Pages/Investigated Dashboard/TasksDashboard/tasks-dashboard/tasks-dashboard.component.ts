import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../../../Services/Task/task.service';
import { TasksToDashboard } from '../../../../../Models/Tasks/tasks-to-dashboard';
import { Router, RouterLink } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-tasks-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tasks-dashboard.component.html',
  styleUrl: './tasks-dashboard.component.scss'
})
export class TasksDashboardComponent implements OnInit {
 tasksInDashboard:TasksToDashboard[]=[];
 selectedTaskId : string | null = null;

constructor(private taskdashboardService: TaskService,private router: Router){}
  ngOnInit(): void {
    this.taskdashboardService.getTasksToDashboard().subscribe({
      next:(tasks)=>{
        this.tasksInDashboard=tasks;

      },
      error:(err)=>{
        console.log(err);

      }
    })
  }
  selectProject(id :string){
    this.selectedTaskId = id;
  }
  openConfirmModal(){
    const confirmModal = new bootstrap.Modal(
      document.getElementById('confirmDeleteModal'),
      {
        keyboard: false,
      }
    );
    confirmModal.show();
  }

  reloadComponent() {
    // Navigate away and back to the current route
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  deleteSchool(){
    if (this.selectedTaskId) {
      this.taskdashboardService.deleteTask(this.selectedTaskId).subscribe({
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
      console.log('No Task selected for deletion');
    }
  }

  goTaskDetails(id:string){

     this.router.navigate(['/TaskDetailsInDashboard',id])
  }
}
