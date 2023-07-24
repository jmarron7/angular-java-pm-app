package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.AnnouncementDto;

public interface AnnouncementService {

    AnnouncementDto postAnnouncement(Long id, AnnouncementDto announcementDto);
}
