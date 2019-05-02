import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '404', component: P404Component, data: { title: 'Page 404' } },
  { path: '500', component: P500Component, data: { title: 'Page 500' } },
  { path: 'login', component: LoginComponent, data: { title: 'Login Page' } },
  { path: 'register', component: RegisterComponent, data: { title: 'Register Page' } },
  {
    path: '', component: DefaultLayoutComponent, data: { title: 'Home' },
    children: [
      { path: 'dashboard', loadChildren: './views/dashboard/dashboard.module#DashboardModule' },
      { path: 'exercise', loadChildren: './views/exercise/exercise.module#ExerciseModule' },
      { path: 'food', loadChildren: './views/food/food.module#FoodModule', canActivate: [AuthGuard] },
      { path: 'image', loadChildren: './views/image/image.module#ImageModule' },
      { path: 'log', loadChildren: './views/log/log.module#LogModule' },
      { path: 'nutrient', loadChildren: './views/nutrient/nutrient.module#NutrientModule' },
      { path: 'notification', loadChildren: './views/notifications/notifications.module#NotificationsModule' },
      { path: 'profile', loadChildren: './views/profile/profile.module#ProfileModule' },
      { path: 'setting', loadChildren: './views/setting/setting.module#SettingModule' },
      { path: 'user', loadChildren: './views/user/user.module#UserModule' },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
