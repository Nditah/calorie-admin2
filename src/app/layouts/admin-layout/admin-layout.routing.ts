import { Routes } from '@angular/router';
import { AuthGuard } from '../../services/auth.guard';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ExerciseComponent } from 'src/app/pages/exercise/exercise.component';

export const AdminLayoutRoutes: Routes = [
    // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard',                    component: DashboardComponent,              canActivate: [AuthGuard] },
    { path: 'exercise',
                      loadChildren: '../../pages/exercise/exercise.module#ExerciseModule',
                      canActivate: [AuthGuard]
    },
    { path: 'food',
                      loadChildren: '../../pages/food/food.module#FoodModule',
                      canActivate: [AuthGuard]
    },
    { path: 'notification',
                      loadChildren: '../../pages/feedback/feedback.module#FeedbackModule',
                      canActivate: [AuthGuard]
    },
    { path: 'nutrient',
                      loadChildren: '../../pages/nutrient/nutrient.module#NutrientModule',
                      canActivate: [AuthGuard]
    },
    { path: 'image',
                      loadChildren: '../../pages/image/image.module#ImageModule',
                      canActivate: [AuthGuard]
    },
    { path: 'user',
                      loadChildren: '../../pages/user/user.module#UserModule',
                      canActivate: [AuthGuard]
    },
    { path: 'setting',
                      loadChildren: '../../pages/setting/setting.module#SettingModule',
                      canActivate: [AuthGuard]
    },
    { path: 'log',
                      loadChildren: '../../pages/log/log.module#LogModule',
                      canActivate: [AuthGuard]
    },
  ];
