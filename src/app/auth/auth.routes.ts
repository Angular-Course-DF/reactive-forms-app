import { Routes } from '@angular/router';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const authRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'register',
        component: RegisterPageComponent,
      },
      {
        path: '**',
        redirectTo: 'register',
      },
    ],
  },
];

export default authRoutes;
