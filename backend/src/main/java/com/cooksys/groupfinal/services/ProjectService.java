package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.ProjectDto;

public interface ProjectService {

    ProjectDto postProject(Long companyId, Long teamId, ProjectDto projectDto);
}
