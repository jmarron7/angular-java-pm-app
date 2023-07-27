package com.cooksys.groupfinal.controllers;

import java.util.Set;

import com.cooksys.groupfinal.services.*;
import org.springframework.http.HttpStatus;
import com.cooksys.groupfinal.dtos.*;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/company")
@RequiredArgsConstructor
@CrossOrigin(origins="*")
public class CompanyController {

    private final CompanyService companyService;
    private final AnnouncementService announcementService;
    private final TeamService teamService;
    private final ProjectService projectService;
    private final UserService userService;

    @GetMapping("/all")
    public Set<CompanyDto> getAllCompanies(@RequestBody CredentialsDto credentialsDto) {
        return companyService.getAllCompanies(credentialsDto);
    }

    @GetMapping("/{id}/users")
    public Set<FullUserDto> getAllUsers(@PathVariable Long id) {
        return companyService.getAllUsers(id);
    }

    @GetMapping("/{id}/announcements")
    public Set<AnnouncementDto> getAllAnnouncements(@PathVariable Long id) {
        return companyService.getAllAnnouncements(id);
    }

    @GetMapping("/{id}/teams")
    public Set<TeamDto> getAllTeams(@PathVariable Long id) {
        return companyService.getAllTeams(id);
    }

    @GetMapping("/{companyId}/teams/{teamId}/projects")
    public Set<ProjectDto> getAllProjects(@PathVariable Long companyId, @PathVariable Long teamId) {
        return companyService.getAllProjects(companyId, teamId);
    }

    @PostMapping("/{id}/user")
    @ResponseStatus(HttpStatus.CREATED)
    public FullUserDto createUser(@PathVariable Long id, @RequestBody UserRequestDto userRequestDto) {
        return userService.createUser(id, userRequestDto);
    }

    @PostMapping("/{id}/announcement")
    @ResponseStatus(HttpStatus.CREATED)
    public AnnouncementDto postAnnouncement(@PathVariable Long id, @RequestBody AnnouncementDto announcementDto) {
        return announcementService.postAnnouncement(id, announcementDto);
    }

    @PostMapping("/{id}/team")
    @ResponseStatus(HttpStatus.CREATED)
    public TeamDto postTeam(@PathVariable Long id, @RequestBody TeamDto teamDto) {
        return teamService.postTeam(id, teamDto);
    }

    @PostMapping("/{companyId}/teams/{teamId}/project")
    @ResponseStatus(HttpStatus.CREATED)
    public ProjectDto postProject(@PathVariable Long companyId, @PathVariable Long teamId, @RequestBody ProjectDto projectDto) {
        return projectService.postProject(companyId, teamId, projectDto);
    }

    @PutMapping("/{companyId}/teams/{teamId}/project/{projectId}")
    public ProjectDto updateProject(@PathVariable Long companyId, @PathVariable Long teamId,
                                    @PathVariable Long projectId, @RequestBody ProjectDto projectDto) {
        return projectService.updateProject(companyId, teamId, projectId, projectDto);
    }

    @PutMapping("/{companyId}/user")
    public BasicUserDto addUserByEmail(@PathVariable Long companyId, @RequestBody String email) {
        return companyService.addUserByEmail(companyId, email);
    }
}
