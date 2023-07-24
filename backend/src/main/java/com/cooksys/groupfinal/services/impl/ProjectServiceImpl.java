package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Project;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.ProjectMapper;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.ProjectRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.services.ProjectService;

import lombok.RequiredArgsConstructor;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final CompanyRepository companyRepository;
    private final TeamRepository teamRepository;
    private final ProjectMapper projectMapper;
    private final ProjectRepository projectRepository;
    private final TeamMapper teamMapper;

    @Override
    public ProjectDto postProject(Long companyId, Long teamId, ProjectDto projectDto) {
        // untested
        Optional<Company> opCompany = companyRepository.findById(companyId);
        if(opCompany.isEmpty()) throw new NotFoundException("Could not find company with ID " + companyId);
        Company company = opCompany.get();
        Optional<Team> opTeam = teamRepository.findById(teamId);
        if(opTeam.isEmpty()) throw new NotFoundException("Could not find team with ID " + teamId);
        Team team = opTeam.get();
        if(!company.getTeams().contains(team)) throw new BadRequestException("Could not find team with ID " + teamId);
        Project project = projectMapper.dtoToEntity(projectDto);
        return projectMapper.entityToDto(projectRepository.saveAndFlush(project));
    }

    @Override
    public ProjectDto updateProject(Long companyId, Long teamId, Long projectId, ProjectDto projectDto) {
        // untested
        Optional<Company> opCompany = companyRepository.findById(companyId);
        if(opCompany.isEmpty()) throw new NotFoundException("Could not find company with ID " + companyId);
        Company company = opCompany.get();
        Optional<Team> opTeam = teamRepository.findById(teamId);
        if(opTeam.isEmpty()) throw new NotFoundException("Could not find team with ID " + teamId);
        Team team = opTeam.get();
        Optional<Project> opProject = projectRepository.findById(projectId);
        if(opProject.isEmpty()) throw new NotFoundException("Could not find project with ID " + projectId);
        Project project = opProject.get();
        if(projectDto.getName() != null)
            project.setName(projectDto.getName());
        if(projectDto.getDescription() != null)
            project.setDescription(projectDto.getDescription());
        project.setActive(projectDto.isActive());
        if(projectDto.getTeam() != null)
            project.setTeam(teamMapper.dtoToEntity(projectDto.getTeam()));
        return projectMapper.entityToDto(projectRepository.saveAndFlush(project));
    }
}
