import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'main',
        children: [
          {
            path: '',
            loadChildren: () => import('../main/main.module').then( m => m.MainPageModule)
          }
        ]
      },
      {
        path: 'appointments',
        children: [
          {
            path: '',
            loadChildren: () => import('../appointments/appointments.module').then( m => m.AppointmentsPageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () => import('../account/account.module').then( m => m.AccountPageModule)
          }
        ]
      },
      {
        path: 'intro',
        children: [
          {
            path: '',
            loadChildren: () => import('../intro/intro.module').then( m => m.IntroPageModule )
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/intro',
    pathMatch: 'full'
  }
];

@NgModule({
  // RouterModule.forChild(routes)
  imports: [
    RouterModule.forChild(routes)
    // RouterModule.forRoot(routes, {
    //   preloadingStrategy: PreloadAllModules
    // })
  ],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
