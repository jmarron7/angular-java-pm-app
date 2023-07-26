package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.entities.*;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.mappers.ProjectMapper;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.services.CompanyService;
import com.cooksys.groupfinal.services.UserService;
import com.cooksys.groupfinal.services.ValidateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {

    private final FullUserMapper fullUserMapper;
    private final AnnouncementMapper announcementMapper;
    private final TeamMapper teamMapper;
    private final ProjectMapper projectMapper;
    private final UserService userService;
    private final ValidateService validateService;

    @Override
    public Set<CompanyDto> getAllCompanies(CredentialsDto credentialsDto) {
        FullUserDto fullUserDto = userService.login(credentialsDto);
        return fullUserDto.getCompanies();
    }

    @Override
    public Set<FullUserDto> getAllUsers(Long id) {
        Company company = validateService.findCompany(id);
        Set<User> filteredUsers = new HashSet<>();
        company.getEmployees().forEach(filteredUsers::add);
        filteredUsers.removeIf(user -> !user.isActive());
        return fullUserMapper.entitiesToFullUserDtos(filteredUsers);
    }

    @Override
    public Set<AnnouncementDto> getAllAnnouncements(Long id) {
        Company company = validateService.findCompany(id);
        List<Announcement> sortedList = new ArrayList<>(company.getAnnouncements());
        sortedList.sort(Comparator.comparing(Announcement::getDate).reversed());
        Set<Announcement> sortedSet = new HashSet<>(sortedList);
        return announcementMapper.entitiesToDtos(sortedSet);
    }

    @Override
    public Set<TeamDto> getAllTeams(Long id) {
        Company company = validateService.findCompany(id);
        return teamMapper.entitiesToDtos(company.getTeams());
    }

    @Override
    public Set<ProjectDto> getAllProjects(Long companyId, Long teamId) {
        Company company = validateService.findCompany(companyId);
        Team team = validateService.findTeam(teamId);
        if (!company.getTeams().contains(team))
            throw new NotFoundException("A team with id " + teamId + " does not exist at company with id " + companyId + ".");
        Set<Project> filteredProjects = new HashSet<>();
        team.getProjects().forEach(filteredProjects::add);
        filteredProjects.removeIf(project -> !project.isActive());
        return projectMapper.entitiesToDtos(filteredProjects);
    }

}
