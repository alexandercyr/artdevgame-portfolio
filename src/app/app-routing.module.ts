import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColorFiltersComponent } from './color-filters/color-filters.component';
import { MainComponent } from './main/main.component';
import { ProjectComponent } from './project/project.component';


const routes: Routes = [
  {
    path: "",
    component: ProjectComponent
  }, {
    path: ":id",
    component: ProjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
