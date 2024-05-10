import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutAdminComponent } from '../main-layout-admin/main-layout-admin.component';
import { roleGuardGuard } from '../../../../Guards/role-guard.guard';
import { AdminDashboardComponent } from '../Accounts/admin-dashboard/admin-dashboard.component';
import { SchoolManagementComponent } from '../School/school-management/school-management.component';
import { AccountsBasedOnRolesComponent } from '../Accounts/accounts-based-on-roles/accounts-based-on-roles.component';
import { UpdateUserComponent } from '../Accounts/update-user/update-user.component';
import { GetSchoolsComponent } from '../School/get-schools/get-schools.component';
import { SchoolDetailsComponent } from '../School/school-details/school-details.component';
import { EditSchoolComponent } from '../School/edit-school/edit-school.component';
import { ViewTicketsComponent } from '../Tickets/view-tickets/view-tickets.component';
import { AddResponseComponent } from '../Tickets/add-response/add-response.component';
import { AllNewsComponent } from '../News/all-news/all-news.component';
import { UpdateNewsComponent } from '../News/update-news/update-news.component';
import { AddNewsComponent } from '../News/add-news/add-news.component';
import { ViewEventsComponent } from '../EventsDashboard/view-events/view-events.component';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutesRoutingModule {}
