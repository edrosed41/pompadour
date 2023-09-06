import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthguardService } from './services/authguard/authguard.service';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', canActivate: [AuthguardService], data: { authGuardRedirect: 'sign-in' }, pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'tabs',
    canActivate: [AuthguardService], data: { authGuardRedirect: 'sign-in' },
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/account/sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/account/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'account-confirmation',
    loadChildren: () => import('./pages/account/confirmation/confirmation.module').then( m => m.ConfirmationPageModule)
  },
  {
    path: 'otp-validator',
    loadChildren: () => import('./pages/modals/otp-validator/otp-validator.module').then( m => m.OtpValidatorPageModule)
  },
  {
    path: 'appointments',
    loadChildren: () => import('./pages/appointments/appointments.module').then( m => m.AppointmentsPageModule)
  },
  {
    path: 'rating',
    loadChildren: () => import('./pages/modals/rating/rating.module').then( m => m.RatingPageModule)
  },
  {
    path: 'earnings',
    loadChildren: () => import('./pages/earnings/earnings.module').then( m => m.EarningsPageModule)
  },
  {
    path: 'ratings',
    loadChildren: () => import('./pages/ratings/ratings.module').then( m => m.RatingsPageModule)
  },
  {
    path: 'help-center',
    loadChildren: () => import('./pages/help-center/help-center.module').then( m => m.HelpCenterPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./pages/privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
