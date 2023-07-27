package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.entities.*;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.*;
import com.cooksys.groupfinal.repositories.UserRepository;
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
    private final UserRepository userRepository;
    private final ValidateService validateService;
    private final BasicUserMapper basicUserMapper;

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

    @Override
    public BasicUserDto addUserByEmail(Long companyId, String email) {
            Optional<User> user = userRepository.findByProfileEmailAndActiveTrue(email);
            if (user.isEmpty())
                throw new BadRequestException("The email provided does not belong to an active user.");
            if (!user.get().isAdmin()) {
                throw new BadRequestException("The email provided does not belong to an admin");
            }

            Company company = validateService.findCompany(companyId);
            if (user.get().getCompanies().contains(company)) {
                throw new BadRequestException("This user already belongs to this company");
            }

            user.get().getCompanies().add(company);

            return basicUserMapper.entityToBasicUserDto(userRepository.saveAndFlush(user.get()));
    }

}
