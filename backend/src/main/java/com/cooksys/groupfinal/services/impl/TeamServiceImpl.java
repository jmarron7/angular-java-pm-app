package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

    private final CompanyRepository companyRepository;
    private final TeamMapper teamMapper;
    private final TeamRepository teamRepository;

    @Override
    public TeamDto postTeam(Long id, TeamDto teamDto) {
        // untested
        Optional<Company> opCompany = companyRepository.findById(id);
        if(opCompany.isEmpty()) throw new NotFoundException("Could not find company with ID " + id);
        Company company = opCompany.get();
        Team team = teamMapper.dtoToEntity(teamDto);
        team.setCompany(company);
        return teamMapper.entityToDto(teamRepository.saveAndFlush(team));
    }
}
