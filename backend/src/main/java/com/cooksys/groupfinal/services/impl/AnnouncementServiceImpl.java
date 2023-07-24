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
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final AnnouncementMapper announcementMapper;

    @Override
    public AnnouncementDto postAnnouncement(Long id, AnnouncementDto announcementDto) {
        //tested 1
        Optional<Company> opCompany = companyRepository.findById(id);
        Optional<User> opUser = userRepository.findById(announcementDto.getAuthor().getId());
        if(opUser.isEmpty()) throw new BadRequestException("Unable to find user");
        User user = opUser.get();
        if(opCompany.isEmpty()) throw new NotFoundException("Could not find company with ID " + id);
        if(!announcementDto.getAuthor().isActive()) throw new BadRequestException("This user is not currently active");
        Announcement announcement = announcementMapper.dtoToEntity(announcementDto);
        announcement.setDate(Timestamp.valueOf(LocalDateTime.now()));
        announcement.setCompany(opCompany.get());
        announcement.getAuthor().setProfile(user.getProfile());
        return announcementMapper.entityToDto(announcementRepository.saveAndFlush(announcement));
    }
}