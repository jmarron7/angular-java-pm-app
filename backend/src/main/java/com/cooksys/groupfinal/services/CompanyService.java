package com.cooksys.groupfinal.services;

import java.util.Set;

import com.cooksys.groupfinal.dtos.*;

public interface CompanyService {

	Set<CompanyDto> getAllCompanies(CredentialsDto credentials);

	Set<FullUserDto> getAllUsers(Long id);

	Set<AnnouncementDto> getAllAnnouncements(Long id);

	Set<TeamDto> getAllTeams(Long id);

	Set<ProjectDto> getAllProjects(Long companyId, Long teamId);

}
