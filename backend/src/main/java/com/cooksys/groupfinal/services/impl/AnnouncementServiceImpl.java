package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.CompanyService;
import com.cooksys.groupfinal.services.ValidateService;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.services.AnnouncementService;

import lombok.RequiredArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {

    private final AnnouncementRepository announcementRepository;
    private final AnnouncementMapper announcementMapper;
    private final ValidateService validateService;

    @Override
    public AnnouncementDto postAnnouncement(Long id, AnnouncementDto announcementDto) {
        Company company = validateService.findCompany(id);
        User user = validateService.findUser(announcementDto.getAuthor().getId());
        if (!announcementDto.getAuthor().isActive()) throw new BadRequestException("This user is not currently active");
        Announcement announcement = announcementMapper.dtoToEntity(announcementDto);
        announcement.setDate(Timestamp.valueOf(LocalDateTime.now()));
        announcement.setCompany(company);
        announcement.getAuthor().setProfile(user.getProfile());
        return announcementMapper.entityToDto(announcementRepository.saveAndFlush(announcement));
    }
}