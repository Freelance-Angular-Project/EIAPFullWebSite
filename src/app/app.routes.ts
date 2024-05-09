import { Routes } from '@angular/router';
import { MainHomeComponent } from './Components/Pages/main-home/main-home.component';
import { TicketsComponent } from './Components/Pages/tickets/tickets.component';
import { EventsComponent } from './Components/Pages/events/events.component';
import { SchooldashboardComponent } from './Components/Pages/School Dashboard/schooldashboard/schooldashboard.component';
import { SchooldashboardtasksComponent } from './Components/Pages/School Dashboard/schooldashboardtasks/schooldashboardtasks.component';
import { Project1Component } from './Components/Pages/Projects/project1/project1.component';
import { NotFoundPageComponent } from './Components/Pages/not-found-page/not-found-page.component';
import { roleGuardGuard } from './Guards/role-guard.guard';
import { TicketsDashboardComponent } from './Components/Pages/Investigated Dashboard/tickets-dashboard/tickets-dashboard.component';
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
export const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home', component: MainHomeComponent, title: 'Home Page' },
  {
    path: 'Project/:id',
    component: Project1Component,
    title: 'Project Page',
  },

  {
    path: 'Events',
    component: EventsComponent,
    title: 'Events Page',
  },
  // tickets
  {
    path: '',
    loadChildren: () =>
      import(
        '../app/Components/Pages/tickets/ticket-routes/ticket-routes.module'
      ).then((m) => m.TicketRoutesModule),
  },
  //School Manager dashboard
  {
    path: '',
    loadChildren: () =>
      import(
        '../app/Components/Pages/School Dashboard/school-dashboard-routes/school-dashboard-routes.module'
      ).then((m) => m.SchoolDashboardRoutesModule),
  },
  // ticket dashboard routes
  {
    path: '',
    loadChildren: () =>
      import(
        '../app/Components/Pages/Investigated Dashboard/tickets-dashboard/ticket-dashboard-routes/ticket-dashboard-routes.module'
      ).then((m) => m.TicketDashboardRoutesModule),
  },

  // project dashboard routes
  {
    path: 'ProjectRoutes',
    loadChildren: () =>
      import(
        '../app/Components/Pages/Project Manager Dashboard/project-dashboard-routes.module'
      ).then((m) => m.ProjectDashboardRoutesModule),
  },
  // assignments routes
  {
    path: 'Assignment',
    loadChildren: () =>
      import(
        '../app/Components/Pages/Investigated Dashboard/Assignments/assignment-routes.module'
      ).then((m) => m.AssignmentRoutesModule),
  },
  // task routes
  {
    path: '',
    loadChildren: () =>
      import(
        '../app/Components/Pages/Investigated Dashboard/TasksDashboard/task-dashboard-routes.module'
      ).then((m) => m.TaskDashboardRoutesModule),
  },
  // admin routes
  {
    path: '',
    loadChildren: () =>
      import(
        '../app/Components/Pages/Admin/admin-routes/admin-routes.module'
      ).then((m) => m.AdminRoutesModule),
  },
  { path: '**', component: NotFoundPageComponent, title: 'not found page' },
];
