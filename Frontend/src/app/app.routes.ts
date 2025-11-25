import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth';
import { adminGuard } from './core/guards/admin/amin';

export const routes: Routes = [
  {path:'', loadComponent:()=>import('./pages/landing/landing').then(m=>m.Landing)},
  {path:'login', loadComponent:()=>import('./pages/auth/login/login').then(m=>m.Login)},
  {path:'register', loadComponent:()=>import('./pages/auth/register/register').then(m=>m.Register)},
  {path:'employee/dashboard', canActivate :[authGuard], loadComponent:()=>import('./pages/employees/dashboard/dashboard').then(m=>m.Dashboard)},
  {path:'employee/program', loadComponent:()=>import('./pages/employees/my-programs/my-programs').then(m=>m.MyPrograms)},
  {path:'employee/program/:id', loadComponent:()=>import('./pages/employees/my-programs/program-details/program-details').then(m=>m.ProgramDetails)},
  {path:'employee/events', loadComponent:()=>import('./pages/employees/event/event').then(m=>m.Event)},
  {path:'employee/event/:id',loadComponent:()=>import('./pages/employees/event/event-details/event-details').then(m=>m.EventDetails)},
  {path:'employee/my-profile', loadComponent:()=>import('./pages/employees/my-profile/my-profile').then(m=>m.MyProfile)},
  {path: 'employee/my-enrollment', loadComponent:()=>import('./pages/employees/my-enrollments/my-enrollments').then(m=>m.MyEnrollments)},
  {path:'employee/challenges', loadComponent:()=>import('./pages/employees/challenges/challenges').then(m=>m.Challenge)},
  {path:'employee/my-certificate', loadComponent:()=>import('./pages/employees/my-certificate/my-certificate').then(m=>m.Certificates)},

  //admin
  {
  path: 'admin',
  canActivate: [adminGuard],
  loadComponent: () =>
    import('./pages/admin/admin-layout/admin-layout').then(m => m.AdminLayout),

  children: [
    {
      path: 'employees',
      loadComponent: () =>
        import('./pages/admin/admin-employees/admin-employees').then(
          m => m.AdminEmployees
        )
    },{
      path:'programs', loadComponent:()=>import('./pages/admin/admin-program/admin-program').then(m=>m.AdminPrograms)
    },
    {
      path:'events', loadComponent:()=>import('./pages/admin/admin-event/admin-event').then(m=>m.AdminEvents)
    },{
      path:'enrollments', loadComponent:()=>import('./pages/admin/admin-enrollment/admin-enrollment').then(m=>m.AdminEnrollment)
    },
    {path:'challenges', loadComponent:()=>import('./pages/admin/admin-challenge/admin-challenge').then(m=>m.AdminChallenge)}
  ]},
  {path:'admin/my-profile', loadComponent:()=>import('./pages/admin/admin-profile/admin-profile').then(m=>m.AdminProfile)}

];
