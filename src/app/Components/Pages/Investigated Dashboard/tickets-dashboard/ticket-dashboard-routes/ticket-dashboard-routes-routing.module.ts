import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsDashboardComponent } from '../All-tickets/tickets-dashboard.component';
import { roleGuardGuard } from '../../../../../Guards/role-guard.guard';
import { TicketDetailsComponent } from '../ticket-details/ticket-details.component';
import { AddResponseComponent } from '../add-response/add-response.component';

const routes: Routes = [
  {
    path: 'TicketsDashboard',
    component: TicketsDashboardComponent,
    title: 'Tickets Dashboard Page',
    canActivate: [roleGuardGuard],
    data: { role: ['Investigated', 'Admin'] },
  },
  {
    path: 'TicketDetails/:id',
    component: TicketDetailsComponent,
    title: 'Ticket Details Page',
    canActivate: [roleGuardGuard],
    data: { role: ['Investigated', 'Admin'] },
  },
  {
    path: 'addResponse/:ID',
    component: AddResponseComponent,
    title: 'Add Responce Page',
    canActivate: [roleGuardGuard],
    data: { role: ['Investigated', 'Admin'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketDashboardRoutesRoutingModule {}
