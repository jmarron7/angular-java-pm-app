package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import com.cooksys.groupfinal.services.AnnouncementService;
import com.cooksys.groupfinal.services.ValidateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;

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