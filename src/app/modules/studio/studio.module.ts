import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudioComponent } from '../../components/studio/studio.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { StreamComponent } from '../../components/stream/stream.component';
import { TasksComponent } from '../../components/tasks/tasks.component';
import { AssetsComponent } from '../../components/assets/assets.component';

const routes: Routes = [
  {
    path: '',
    component: StudioComponent,
    children: [
      {
        path: 'stream',
        pathMatch: 'full',
        component: StreamComponent,
      }, 
      {
        path: 'tasks',
        pathMatch: 'full',
        component: TasksComponent,
      }, 
      {
        path: 'dashboard',
        pathMatch: 'full',
        component: DashboardComponent,
      },
      {
        path: 'assets',
        pathMatch: 'full',
        component: AssetsComponent,
      },
      {
        path: '**',
        redirectTo: 'stream',
      }
    ],
  }
];
@NgModule({
  declarations: [
    StudioComponent,
    NavbarComponent,
    AssetsComponent,
    SidebarComponent,
    DashboardComponent,
    StreamComponent,
    TasksComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    StudioComponent,
    NavbarComponent,
    AssetsComponent,
    SidebarComponent,
    DashboardComponent,
    StreamComponent,
    TasksComponent,
  ],
})
export class StudioModule { }
