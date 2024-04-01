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
import { TasksDashboardComponent } from './Components/Pages/Investigated Dashboard/tasks-dashboard/tasks-dashboard.component';
import { InvestigatedAnalyticsComponent } from './Components/Pages/Investigated Dashboard/investigated-analytics/investigated-analytics.component';
import { AdminDashboardComponent } from './Components/Pages/Admin/admin-dashboard/admin-dashboard.component';


export const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home', component: MainHomeComponent, title: 'Home Page' },
  {
    path: 'Project/:id',
    component: Project1Component,
    title: 'Project Page'
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
    title: 'Events Page'
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
    data: { role: ['ProjectManager','Admin'] },
  },
  {
    path: 'ProjectAnalytics',
    component: ProjectAnalyticsComponent,
    title: 'Project Analytics Page',
    canActivate: [roleGuardGuard],
    data: { role: ['ProjectManager','Admin'] },
  },


  //Investigated
  {
    path: 'TicketsDashboard',
    component: TicketsDashboardComponent,
    title: 'Tickets Dashboard Page',
    canActivate: [roleGuardGuard],
    data: { role: ['Investigated','Admin'] },
  },

  {
    path: 'TasksDashboard',
    component: TasksDashboardComponent,
    title: 'Tasks Dashboard Page',
    canActivate: [roleGuardGuard],
    data: { role: ['Investigated','Admin'] },
  },

  {
    path: 'InvestigatedAnalytics',
    component: InvestigatedAnalyticsComponent,
    title: 'Investigated Analytics Page',
    canActivate: [roleGuardGuard],
    data: { role: ['Investigated','Admin'] },
  },
  //Admin
  {
    path: 'AdminDashboard',
    component: AdminDashboardComponent,
    title: 'Admin Dashboard Page',
    canActivate: [roleGuardGuard],
    data: { role: ['Admin'] },
  },



  { path: '**', component: NotFoundPageComponent, title: 'not found page' },
];
