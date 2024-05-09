import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAssignmentComponent } from './edit-assignment/edit-assignment.component';
import { roleGuardGuard } from '../../../../Guards/role-guard.guard';
import { GetAssignmentComponent } from './get-assignment/get-assignment.component';

const routes: Routes = [
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignmentRoutesRoutingModule { }
