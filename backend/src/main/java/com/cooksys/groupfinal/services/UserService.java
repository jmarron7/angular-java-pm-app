package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.entities.User;

public interface UserService {

	FullUserDto login(CredentialsDto credentialsDto);

    FullUserDto createUser(Long id, UserRequestDto userRequestDto);

    BasicUserDto updateUser(Long id, UserRequestDto userRequestDto);
}
