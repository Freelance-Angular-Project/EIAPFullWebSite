import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsDashboardComponent } from '../tickets-dashboard.component';
import { roleGuardGuard } from '../../../../../Guards/role-guard.guard';

const routes: Routes = [
  {
    path: 'TicketsDashboard',
    component: TicketsDashboardComponent,
    title: 'Tickets Dashboard Page',
    canActivate: [roleGuardGuard],
    data: { role: ['Investigated', 'Admin'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketDashboardRoutesRoutingModule { }
