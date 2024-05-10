import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { roleGuardGuard } from '../../../../Guards/role-guard.guard';
import { TasksDashboardComponent } from './tasks-dashboard/tasks-dashboard.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { AddTaskNoteComponent } from './add-task-note/add-task-note.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';

const routes: Routes = [
  {
    path: 'TasksDashboard',
    component: TasksDashboardComponent,
    title: 'Tasks Dashboard Page',
    canActivate: [roleGuardGuard],
    data: { role: ['Investigated', 'Admin'] },
  },
  {
    path: 'AddTaskInDashboard',
    component: AddTaskComponent,
    title: 'Add Task Page',
    canActivate: [roleGuardGuard],
    data: { role: ['Investigated', 'Admin'] },
  },
  {
    path: 'AddTaskNoteInDashboard/:taskid',
    component: AddTaskNoteComponent,
    title: 'Add Task Note Page',
    canActivate: [roleGuardGuard],
    data: { role: ['Investigated', 'Admin'] },
  },
  {
    path: 'EditTaskInDashboard/:taskID',
    component: EditTaskComponent,
    title: 'Edit Task Page',
    canActivate: [roleGuardGuard],
    data: { role: ['Investigated', 'Admin'] },
  },
  {
    path: 'TaskDetailsInDashboard/:ID',
    component: TaskDetailsComponent,
    title: 'Task Details Page',
    canActivate: [roleGuardGuard],
    data: { role: ['Investigated', 'Admin'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskDashboardRoutesRoutingModule { }
