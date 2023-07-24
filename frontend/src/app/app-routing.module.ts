import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SelectCompanyComponent } from './select-company/select-company.component';
import { ProjectsComponent } from './projects/projects.component';
const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "select", component: SelectCompanyComponent },
  {path: "projects", component: ProjectsComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
