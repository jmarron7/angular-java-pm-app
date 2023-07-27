package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Project;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;

public interface ValidateService {

    Company findCompany(Long id);

    User findUser(Long id);

    User findUser(String username);

    Team findTeam(Long id);

    Project findProject(Long id);
}
