import { Routes } from '@angular/router';
import { MainHomeComponent } from './Components/Pages/main-home/main-home.component';
import { TicketsComponent } from './Components/Pages/tickets/tickets.component';
import { EventsComponent } from './Components/Pages/events/events.component';
import { SchooldashboardComponent } from './Components/Pages/School Dashboard/schooldashboard/schooldashboard.component';
import { SchooldashboardtasksComponent } from './Components/Pages/School Dashboard/schooldashboardtasks/schooldashboardtasks.component';
import { Project1Component } from './Components/Pages/Projects/project1/project1.component';
import { NotFoundPageComponent } from './Components/Pages/not-found-page/not-found-page.component';
import { roleGuardGuard } from './Guards/role-guard.guard';
import { ProjectDashboardComponent } from './Components/Pages/Project Manager Dashboard/project-dashboard/project-dashboard.component';
import { ProjectAnalyticsComponent } from './Components/Pages/Project Manager Dashboard/project-analytics/project-analytics.component';
import { TicketsDashboardComponent } from './Components/Pages/Investigated Dashboard/tickets-dashboard/tickets-dashboard.component';
import { TasksDashboardComponent } from './Components/Pages/Investigated Dashboard/TasksDashboard/tasks-dashboard/tasks-dashboard.component';
import { InvestigatedAnalyticsComponent } from './Components/Pages/Investigated Dashboard/investigated-analytics/investigated-analytics.component';
import { AdminDashboardComponent } from './Components/Pages/Admin/Accounts/admin-dashboard/admin-dashboard.component';
import { MainLayoutAdminComponent } from './Components/Pages/Admin/main-layout-admin/main-layout-admin.component';
import { SchoolManagementComponent } from './Components/Pages/Admin/School/school-management/school-management.component';
import { AccountsBasedOnRolesComponent } from './Components/Pages/Admin/Accounts/accounts-based-on-roles/accounts-based-on-roles.component';
import { GetSchoolsComponent } from './Components/Pages/Admin/School/get-schools/get-schools.component';
import { SchoolDetailsComponent } from './Components/Pages/Admin/School/school-details/school-details.component';
import { EditSchoolComponent } from './Components/Pages/Admin/School/edit-school/edit-school.component';
import { ViewTicketsComponent } from './Components/Pages/Admin/Tickets/view-tickets/view-tickets.component';
import { UpdateUserComponent } from './Components/Pages/Admin/Accounts/update-user/update-user.component';
import { AllNewsComponent } from './Components/Pages/Admin/News/all-news/all-news.component';
import { UpdateNewsComponent } from './Components/Pages/Admin/News/update-news/update-news.component';
import { AddNewsComponent } from './Components/Pages/Admin/News/add-news/add-news.component';
import { ViewEventsComponent } from './Components/Pages/Admin/EventsDashboard/view-events/view-events.component';
import { AddResponseComponent } from './Components/Pages/Admin/Tickets/add-response/add-response.component';
import { ProjectDetailsComponent } from './Components/Pages/Project Manager Dashboard/project-details/project-details.component';
import { AddNewProjectComponent } from './Components/Pages/Project Manager Dashboard/add-new-project/add-new-project.component';
import { EditProjectComponent } from './Components/Pages/Project Manager Dashboard/edit-project/edit-project.component';
import { AddSchoolToProjectComponent } from './Components/Pages/Project Manager Dashboard/add-school-to-project/add-school-to-project.component';
import { AddTaskComponent } from './Components/Pages/Investigated Dashboard/TasksDashboard/add-task/add-task.component';
import { EditTaskComponent } from './Components/Pages/Investigated Dashboard/TasksDashboard/edit-task/edit-task.component';
import { TaskDetailsComponent } from './Components/Pages/Investigated Dashboard/TasksDashboard/task-details/task-details.component';
import { AddTaskNoteComponent } from './Components/Pages/Investigated Dashboard/TasksDashboard/add-task-note/add-task-note.component';
import { EditAssignmentComponent } from './Components/Pages/Investigated Dashboard/Assignments/edit-assignment/edit-assignment.component';
import { GetAssignmentComponent } from './Components/Pages/Investigated Dashboard/Assignments/get-assignment/get-assignment.component';
export const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home', component: MainHomeComponent, title: 'Home Page' },
  {
    path: 'Project/:id',
    component: Project1Component,
    title: 'Project Page',
  },

  {
    path: 'Tickets',
    component: TicketsComponent,
    title: 'Tickets Page',
    canActivate: [roleGuardGuard],
    data: { role: ['SchoolManager'] },
  },
  {
    path: 'Events',
    component: EventsComponent,
    title: 'Events Page',
  },
  //School Manager
  {
    path: 'SchoolDashboard',
    component: SchooldashboardComponent,
    title: 'School Analytics Page',
    canActivate: [roleGuardGuard],
    data: { role: ['SchoolManager'] },
  },
  {
    path: 'SchoolDashboardTask/:schoolid',
    component: SchooldashboardtasksComponent,
    title: 'School Tasks Page',
    canActivate: [roleGuardGuard],
    data: { role: ['SchoolManager'] },
  },

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
  {
    path: 'ProjectAnalytics',
    component: ProjectAnalyticsComponent,
    title: 'Project Analytics Page',
    canActivate: [roleGuardGuard],
    data: { role: ['ProjectManager', 'Admin'] },
  },

  //Investigated
  {
    path: 'TicketsDashboard',
    component: TicketsDashboardComponent,
    title: 'Tickets Dashboard Page',
    canActivate: [roleGuardGuard],
    data: { role: ['Investigated', 'Admin'] },
  },

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
  {
    path: 'InvestigatedAnalytics',
    component: InvestigatedAnalyticsComponent,
    title: 'Investigated Analytics Page',
    canActivate: [roleGuardGuard],
    data: { role: ['Investigated', 'Admin'] },
  },
  {
    path: 'EditAssignment/:id',
    component: EditAssignmentComponent,
    title: 'Edit Assignment Page',
    canActivate: [roleGuardGuard],
    data: { role: ['Investigated', 'Admin'] },
  },
  {
    path: 'Getassignment/:ID',
    component: GetAssignmentComponent,
    title: 'Get Assignment Page',
    canActivate: [roleGuardGuard],
    data: { role: ['Investigated', 'Admin'] },
  },
  {
    path: '',
    component: MainLayoutAdminComponent,
    canActivate: [roleGuardGuard],
    data: { role: ['Admin'] },
    children: [
      {
        path: 'AdminDashboard',
        component: AdminDashboardComponent,
        title: 'Admin Dashboard Page',
        canActivate: [roleGuardGuard],
        data: { role: ['Admin'] },
      },
      {
        path: 'AdminSchool',
        component: SchoolManagementComponent,
        title: 'School Dashboard Page',
        canActivate: [roleGuardGuard],
        data: { role: ['Admin'] },
      },
      {
        path: 'GetAccounts',
        component: AccountsBasedOnRolesComponent,
        title: 'Accounts based on role Page',
        canActivate: [roleGuardGuard],
        data: { role: ['Admin'] },
      },
      {
        path: 'UpdateUser/:selectedRole/:id',
        component: UpdateUserComponent,
        title: 'Update User Page',
        canActivate: [roleGuardGuard],
        data: { role: ['Admin'] },
      },
      {
        path: 'GetSchools',
        component: GetSchoolsComponent,
        title: 'Get Schools Page',
        canActivate: [roleGuardGuard],
        data: { role: ['Admin'] },
      },
      {
        path: 'GetSchoolDetails/:schoolID',
        component: SchoolDetailsComponent,
        title: 'School Details Page',
        canActivate: [roleGuardGuard],
        data: { role: ['Admin'] },
      },
      {
        path: 'UpdateSchool/:ID',
        component: EditSchoolComponent,
        title: 'Update School Page',
        canActivate: [roleGuardGuard],
        data: { role: ['Admin'] },
      },
      {
        path: 'TicketsAdminDashboard',
        component: ViewTicketsComponent,
        title: 'Tickets Dashboard Page',
        canActivate: [roleGuardGuard],
        data: { role: ['Admin'] },
      },
      {
        path: 'TicketsAddResponse/:ID',
        component: AddResponseComponent,
        title: 'Tickets Add Response Page',
        canActivate: [roleGuardGuard],
        data: { role: ['Admin'] },
      },
      {
        path: 'AllNewsDashboard',
        component: AllNewsComponent,
        title: 'All News Dashboard Page',
        canActivate: [roleGuardGuard],
        data: { role: ['Admin'] },
      },
      {
        path: 'UpdateAllNews/:newsid',
        component: UpdateNewsComponent,
        title: 'Update News Dashboard Page',
        canActivate: [roleGuardGuard],
        data: { role: ['Admin'] },
      },
      {
        path: 'AddNews',
        component: AddNewsComponent,
        title: 'Add News Dashboard Page',
        canActivate: [roleGuardGuard],
        data: { role: ['Admin'] },
      },
      {
        path: 'EventsDashboard',
        component: ViewEventsComponent,
        title: 'Events Dashboard Page',
        canActivate: [roleGuardGuard],
        data: { role: ['Admin'] },
      },
    ],
  },

  { path: '**', component: NotFoundPageComponent, title: 'not found page' },
];
