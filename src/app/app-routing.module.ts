import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'studio',
    loadChildren: () => import(`./modules/studio/studio.module`).then(m => m.StudioModule),
  },
  {
    path: '',
    loadChildren: () => import(`./modules/login/login.module`).then(m => m.LoginModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
