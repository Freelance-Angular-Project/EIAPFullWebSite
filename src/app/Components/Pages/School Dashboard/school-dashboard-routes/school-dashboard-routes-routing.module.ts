import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchooldashboardComponent } from '../schooldashboard/schooldashboard.component';
import { roleGuardGuard } from '../../../../Guards/role-guard.guard';
import { SchooldashboardtasksComponent } from '../schooldashboardtasks/schooldashboardtasks.component';
import { SchoolTicketsComponent } from '../school-tickets/school-tickets.component';

const routes: Routes = [
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
  {
    path: 'schoolTickets',
    component: SchoolTicketsComponent,
    title: 'School Tickets Page',
    canActivate: [roleGuardGuard],
    data: { role: ['SchoolManager', 'Admin'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolDashboardRoutesRoutingModule {}
