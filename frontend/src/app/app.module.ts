import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TeamsComponent } from './teams/teams.component';
import { ProjectsComponent } from './projects/projects.component';
import { UserRegistryComponent } from './user-registry/user-registry.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { SelectCompanyComponent } from './select-company/select-company.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TeamsComponent,
    ProjectsComponent,
    UserRegistryComponent,
    AnnouncementsComponent,
    SelectCompanyComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
