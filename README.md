# API Data Types

### CredentialsDto
``` javascript
{
  username: string,
  password: string
}
```

### ProfileDto
``` javascript
{
  firstname: string,
  lastname: string,
  email:string,
  phone: string
}
```

### BasicUserDto
``` javascript
{
  id: long,
  profile: ProfileDto,
  admin: boolean,
  active: boolean,
  status: string
}
```

### FullUserDto
``` javascript
{
  id: long,
  profile: ProfileDto,
  admin: boolean,
  active: boolean,
  status: string,
  companies: [CompanyDto],
  teams: [TeamDto]
}
```

### UserRequestDto
``` javascript
{
  credentials: CredentialsDto,
  profile: ProfileDto,
  admin: boolean,
}
```

### TeamDto
``` javascript
{
  id: long,
  name: string,
  description: string,
  teammates: [BasicUserDto]
}
```

### CompanyDto
``` javascript
{
  id: long,
  name: string,
  description: string,
  teams: [TeamDto],
  employees: [BasicUserDto]
}
```

### AnnouncementDto
``` javascript
{
  id: long,
  date: timestamp,
  title: string,
  message: string,
  author: BasicUserDto
}
```

### ProjectDto
``` javascript
{
  id: long,
  name: string,
  description: string,
  active: boolean,
  team: TeamDto,
  date: timestamp
}
```

---

# API Endpoints

### `POST /users/login`
Logs a user into the application. If any required fields are missing or the `credentials` passed in do not match those of an active user in the database, an error should be sent in lieu of a response.

#### Request
``` javascript
'CredentialsDto'
```

#### Response
``` javascript
'FullUserDto'
```

### `GET company/all`
Retrieves a list of all companies that a logged-in user belongs to. If any required fields are missing or the `credentials` passed in do not match those of an active user in the database, an error should be sent in lieu of a response.

#### Request
``` javascript
'CredentialsDto'
```

#### Response
``` javascript
['CompanyDto']
```

### `GET company/{id}/users`
Retrieves a list of all active users that work for the given company. If the company id provided does not match an active company in the database, an error should be sent in lieu of a response.

#### Response
``` javascript
['FullUserDto']
```

### `GET company/{id}/announcements`
Retrieves a list of all non-deleted announcements for the provided company. If the company id provided does not match an active company in the database, an error should be sent in lieu of a response.

#### Response
``` javascript
['AnnouncementDto']
```

### `GET company/{id}/teams`
Retrieves a list of all non-deleted teams for the provided company. If the company id provided does not match an active company in the database, an error should be sent in lieu of a response.

#### Response
``` javascript
['TeamDto']
```

### `GET company/{id}/teams/{id}/projects`
Retrieves a list of all non-deleted projects for the provided company's team. If the company id or team id provided do not match an active company or team in the database, respectively, an error should be sent in lieu of a response.

#### Response
``` javascript
['ProjectDto']
```

### `POST company/{id}/user`
Creates a user, assigned to a specific company. Request must contain user request consisting of credentials, and profile. If company with ID does not exist, or any fields in request are missing/null, an error will be sent in lieu of a response.

#### Request
``` javascript
'UserRequestDto'
```

#### Response
``` javascript
'FullUserDto'
```

### `POST company/{id}/announcement`
Creates an announcement for a certain company. If any required fields are missing or the `credentials` passed in do not match those of an active user in the database, an error should be sent in lieu of a response.

#### Request
``` javascript
'AnnouncementDto'
```

#### Response
``` javascript
'AnnouncementDto'
```

### `POST company/{id}/team`
Creates a team within a specified company. If company not found with ID, or passed invalid team dto, an error should be sent in lieu of a response.

#### Request
``` javascript
'TeamDto'
```

#### Response
``` javascript
'TeamDto'
```

### `POST company/{id}/teams/{id}/project`
Creates a project within a company, belonging to a team. If the company or team is not found, or if the project dto passed in does not contain all necessary information, an error should be sent in lieu of a response.

#### Request
``` javascript
'ProjectDto'
```

#### Response
``` javascript
'ProjectDto'
```

### `PUT company/{id}/teams/{id}/project/{id}`
Updates an existing project. If the company, team, or project cannot be found, an error should be sent in lieu of a response.

#### Request
``` javascript
'ProjectDto'
```

#### Response
``` javascript
'ProjectDto'
```

### `PUT users/{id}`
Updates an existing user. If the user cannot be found, an error should be sent in lieu of a response.

#### Request
``` javascript
'UserRequestDto'
```

#### Response
``` javascript
'BasicUserDto'
```

### `GET users/{email}`
Retrieves a user matching the provided email. If the email provided dooes not match an active user in the database, an error should be sent in lieu of a response.

#### Response
``` javascript
['BasicUserDto']
```
