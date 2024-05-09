import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { roleGuardGuard } from '../../../../Guards/role-guard.guard';
import { TicketsComponent } from '../tickets.component';

const routes: Routes = [
  {
    path: 'Tickets',
    component: TicketsComponent,
    title: 'Tickets Page',
    canActivate: [roleGuardGuard],
    data: { role: ['SchoolManager'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutesRoutingModule { }
