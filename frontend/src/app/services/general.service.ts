import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export class CredentialsDto
{
  username: string='';
  password: string='';
}
export class ProfileDto
{
  firstname: string='';
  lastname: string='';
  email:string='';
  phone: string='';
}
export class BasicUserDto
{
  id: number=0;
  profile: string='';
  isAdmin: boolean=false;
  active: boolean=false;
  status: string='';
}
export class FullUserDto
{
  id: number=0;
  profile: string='';
  isAdmin: boolean=false;
  active: boolean=false;
  status: string='';
  companies: string='';
  teams: string='';
}
export class UserRequestDto
{
  credentials: string='';
  profile: string='';
  isAdmin: boolean=false;
}
export class TeamDto
{
  id: number=0;
  name: string='';
  description: string='';
  users: string='';
}
export class CompanyDto
{
  id: number=0;
  name: string='';
  description: string='';
  teams: string='';
  users: string='';
}
export class AnnouncementDto
{
  id: number=0;
  date: string='';
  title: string='';
  message: string='';
  author: string='';
}
export class ProjectDto
{
  id: number=0;
  name: string='';
  description: string='';
  active: boolean=false;
  team: string='';
}

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private backendApiUrl = '';

  constructor(private http: HttpClient) { }

  getCredentials(): Observable<CredentialsDto> {
    const url = this.backendApiUrl; 
    return this.http.get<CredentialsDto>(url);
  }

  deleteCredentials(id: number): Observable<any> {
    const url = this.backendApiUrl  + id; 
    return this.http.delete(url);
  }

  postCredentials(data: CredentialsDto): Observable<CredentialsDto> {
    const url = this.backendApiUrl; 
    return this.http.post<CredentialsDto>(url, data);
  }

  getProfile(): Observable<ProfileDto> {
    const url = this.backendApiUrl; 
    return this.http.get<ProfileDto>(url);
  }

  deleteProfile(id: number): Observable<any> {
    const url = this.backendApiUrl  + id; 
    return this.http.delete(url);
  }

  postProfile(data: ProfileDto): Observable<ProfileDto> {
    const url = this.backendApiUrl; 
    return this.http.post<ProfileDto>(url, data);
  }

  getFullUserDto(): Observable<FullUserDto> {
    const url = this.backendApiUrl; 
    return this.http.get<FullUserDto>(url);
  }

  deleteFullUserDto(id: number): Observable<any> {
    const url = this.backendApiUrl  + id; 
    return this.http.delete(url);
  }

  postFullUserDto(data: CredentialsDto): Observable<CredentialsDto> {
    const url = this.backendApiUrl; 
    return this.http.post<CredentialsDto>(url, data);
  }

  getUserRequest(): Observable<UserRequestDto> {
    const url = this.backendApiUrl; 
    return this.http.get<UserRequestDto>(url);
  }

  deleteUserRequest(id: number): Observable<any> {
    const url = this.backendApiUrl  + id; 
    return this.http.delete(url);
  }

  postUserRequest(data: UserRequestDto): Observable<UserRequestDto> {
    const url = this.backendApiUrl; 
    return this.http.post<UserRequestDto>(url, data);
  }

  getCompany(): Observable<CompanyDto> {
    const url = this.backendApiUrl; 
    return this.http.get<CompanyDto>(url);
  }

  deleteCompany(id: number): Observable<any> {
    const url = this.backendApiUrl  + id; 
    return this.http.delete(url);
  }

  postCompany(data: CompanyDto): Observable<CompanyDto> {
    const url = this.backendApiUrl; 
    return this.http.post<CompanyDto>(url, data);
  }

  getAllCompanies(): Observable<CompanyDto[]> {
    const url = this.backendApiUrl + 'companies';
    return this.http.get<CompanyDto[]>(url);
  }

  

}
