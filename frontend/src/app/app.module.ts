import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AnnouncementsComponent } from './pages/announcements/announcements.component';
import { SelectCompanyComponent } from './pages/select-company/select-company.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { UserRegistryComponent } from './pages/user-registry/user-registry.component';
import { AnnouncementCardComponent } from './components/announcement-card/announcement-card.component';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { CreateAnnouncementOverlayComponent } from './components/create-announcement-overlay/create-announcement-overlay.component';
import { TeamCardComponent } from './components/team-card/team-card.component';
import { CreateTeamOverlayComponent } from './components/create-team-overlay/create-team-overlay.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { CreateProjectOverlayComponent } from './components/create-project-overlay/create-project-overlay.component';
import { AddUserOverlayComponent } from './components/add-user-overlay/add-user-overlay.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { AddAdminOverlayComponent } from './components/add-admin-overlay/add-admin-overlay.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AnnouncementsComponent,
    SelectCompanyComponent,
    TeamsComponent,
    ProjectsComponent,
    UserRegistryComponent,
    AnnouncementCardComponent,
    NavmenuComponent,
    CreateAnnouncementOverlayComponent,
    TeamCardComponent,
    CreateTeamOverlayComponent,
    ProjectCardComponent,
    CreateProjectOverlayComponent,
    AddUserOverlayComponent,
    AddAdminOverlayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
