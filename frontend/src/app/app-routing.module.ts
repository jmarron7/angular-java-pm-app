import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SelectCompanyComponent } from './select-company/select-company.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { TeamsComponent } from './teams/teams.component';
import { ProjectsComponent } from './projects/projects.component';
import { UserRegistryComponent } from './user-registry/user-registry.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: "", component: AnnouncementsComponent,canActivate:[AuthGuard]},
  { path: "login", component: LoginComponent},
  { path: "select-company", component: SelectCompanyComponent,canActivate:[AuthGuard]},
  { path: "teams", component: TeamsComponent,canActivate:[AuthGuard]},
  { path: "projects", component: ProjectsComponent,canActivate:[AuthGuard]},
  { path: "user-registry", component: UserRegistryComponent,canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
