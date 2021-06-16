import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './student/edit/edit.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  {path: "", component:StudentComponent},
  {path: "student/add/:id", component:EditComponent},
  {path: "student/edit/:id", component:EditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
