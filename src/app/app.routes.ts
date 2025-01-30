import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskHomeComponentComponent } from './components/task-home-component/task-home-component.component';
import { TaskListComponentComponent } from './components/task-list-component/task-list-component.component';
import { AddTaskComponentComponent } from './components/add-task-component/add-task-component.component';

export const routes: Routes = [
    {
      path: '',
      title: 'App Home Page',
      component: TaskHomeComponentComponent,
    },
      {
        path: 'survey/:id/addoption',
        title: 'question',
        component: AddTaskComponentComponent,
      },
      {
        path: 'list',
        title: 'list',
        component: TaskListComponentComponent,
        },
  ];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}