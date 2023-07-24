package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.services.CompanyService;
import com.cooksys.groupfinal.services.ValidateService;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

    private final TeamMapper teamMapper;
    private final TeamRepository teamRepository;
    private final ValidateService validateService;

    @Override
    public TeamDto postTeam(Long id, TeamDto teamDto) {
        Company company = validateService.findCompany(id);
        Team team = teamMapper.dtoToEntity(teamDto);
        team.setCompany(company);
        return teamMapper.entityToDto(teamRepository.saveAndFlush(team));
    }
}
