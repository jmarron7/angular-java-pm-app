package com.cooksys.groupfinal.services;

import java.util.Set;

import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Team;

public interface CompanyService {

    Set<CompanyDto> getAllCompanies(CredentialsDto credentialsDto);

    Set<FullUserDto> getAllUsers(Long id);

    Set<AnnouncementDto> getAllAnnouncements(Long id);

    Set<TeamDto> getAllTeams(Long id);

    Set<ProjectDto> getAllProjects(Long companyId, Long teamId);

    BasicUserDto addUserByEmail(Long companyId, String email);
}
