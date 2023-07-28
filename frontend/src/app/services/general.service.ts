import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Timestamp } from 'rxjs';

export class CredentialsDto {
  username = '';
  password = '';
}
export class ProfileDto {
  firstName = '';
  lastName = '';
  email = '';
  phone = '';
}
export class BasicUserDto {
  id = 0;
  profile: ProfileDto = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };
  admin = false;
  active = false;
  status = '';
}
export class FullUserDto {
  id = 0;
  profile: ProfileDto = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };
  admin = false;
  active = false;
  status = '';
  companies: CompanyDto[] = [];
  teams: TeamDto[] = [];
}
export class UserRequestDto {
  credentials: CredentialsDto = {
    username: '',
    password: '',
  };
  profile: ProfileDto = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };
  admin = false;
}
export class TeamDto {
  id = 0;
  name = '';
  description = '';
  teammates: BasicUserDto[] = [];
}
export class CompanyDto {
  id = 0;
  name = '';
  description = '';
  teams: TeamDto[] = [];
  employees: BasicUserDto[] = [];
}
export class AnnouncementDto {
  id = 0;
  date = '';
  title = '';
  message = '';
  author: BasicUserDto = {
    id: 0,
    profile: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    admin: false,
    active: false,
    status: '',
  };
}
export class ProjectDto {
  id = 0;
  name = '';
  description = '';
  active = false;
  team: TeamDto = {
    id: 0,
    name: '',
    description: '',
    teammates: [],
  };
  date = '';
}

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  private backendApiUrl = '';

  constructor(private http: HttpClient) {}

  getCredentials(): Observable<CredentialsDto> {
    const url = this.backendApiUrl;
    return this.http.get<CredentialsDto>(url);
  }

  deleteCredentials(id: number): Observable<any> {
    const url = this.backendApiUrl + id;
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
    const url = this.backendApiUrl + id;
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
    const url = this.backendApiUrl + id;
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
    const url = this.backendApiUrl + id;
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
    const url = this.backendApiUrl + id;
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

  getProject(): Observable<ProjectDto[]> {
    const url = this.backendApiUrl + 'companies';
    return this.http.get<ProjectDto[]>(url);
  }
}
