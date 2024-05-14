import { Routes } from '@angular/router';
import { MainHomeComponent } from './Components/Pages/main-home/main-home.component';
import { EventsComponent } from './Components/Pages/events/events.component';
import { Project1Component } from './Components/Pages/Projects/project1/project1.component';
import { NotFoundPageComponent } from './Components/Pages/not-found-page/not-found-page.component';

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
