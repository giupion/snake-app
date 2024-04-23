// app.routes.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SnakeComponent } from './snake/snake.component';

export const routes: Routes = [
  { path: '', redirectTo: '/snake', pathMatch: 'full' },
  { path: 'snake', component: SnakeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
