package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.services.AnnouncementService;

import lombok.RequiredArgsConstructor;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {

    private final AnnouncementRepository announcementRepository;
    private final CompanyRepository companyRepository;
    private final AnnouncementMapper announcementMapper;

    @Override
    public AnnouncementDto postAnnouncement(Long id, AnnouncementDto announcementDto) {
        //untested
        Announcement announcement = announcementMapper.dtoToEntity(announcementDto);
        Optional<Company> opCompany = companyRepository.findById(id);
        if(opCompany.isEmpty()) throw new NotFoundException("Could not find company with ID " + id);
        announcement.setCompany(opCompany.get());
        return announcementMapper.entityToDto(announcementRepository.saveAndFlush(announcement));
    }
}