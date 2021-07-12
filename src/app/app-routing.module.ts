import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskDashboardComponent } from './task-dashboard/task-dashboard.component';


const routes: Routes = [
  {path: '', component: TaskDashboardComponent, pathMatch: 'full'},
  {path: 'edit/:id', component: EditTaskComponent},
  {path: 'details', component: TaskDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
