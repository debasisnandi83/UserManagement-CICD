import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const appRoutes: Routes = [
    {
        path: '',
        loadChildren: './modules/login/login.module#LoginModule'
    },
    {
        path: 'login',
        loadChildren: './modules/login/login.module#LoginModule'
    },
    {
        path: 'dashboard',
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'manageuser',
        loadChildren: './modules/manageuser/manageuser.module#ManageUserModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'error',
        loadChildren: './modules/error/error.module#ErrorModule'
    },
    {
        path: '**', 
        redirectTo: 'error', 
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }


