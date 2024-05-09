import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { roleGuardGuard } from '../../../Guards/role-guard.guard';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { AddSchoolToProjectComponent } from './add-school-to-project/add-school-to-project.component';
import { AddNewProjectComponent } from './add-new-project/add-new-project.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';


const routes: Routes = [
    //Project Manager
    {
      path: 'ProjectDashboard',
      component: ProjectDashboardComponent,
      title: 'Project Dashboard Page',
      canActivate: [roleGuardGuard],
      data: { role: ['ProjectManager','Investigated','Admin'] },
    },
    {
      path: 'CreateProject',
      component: AddNewProjectComponent,
      title: 'Create Project Page',
      canActivate: [roleGuardGuard],
      data: { role: ['ProjectManager', 'Admin'] },
    },
    {
      path: 'UpdateProject/:projectid',
      component: EditProjectComponent,
      title: 'Edit Project Page',
      canActivate: [roleGuardGuard],
      data: { role: ['ProjectManager', 'Admin'] },
    },
    {
      path: 'GetProjectDetails/:id',
      component: ProjectDetailsComponent,
      title: 'Project Details Page',
      canActivate: [roleGuardGuard],
      data: { role: ['ProjectManager', 'Admin'] },
    },
    {
      path: 'addSchooltoProject/:id',
      component: AddSchoolToProjectComponent,
      title: 'Add School to Project Page',
      canActivate: [roleGuardGuard],
      data: { role: ['ProjectManager', 'Admin'] },
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectDashboardRoutesRoutingModule { }
