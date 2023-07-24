package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Credentials;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.mappers.CredentialsMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.UserService;
import com.cooksys.groupfinal.services.ValidateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final FullUserMapper fullUserMapper;
    private final CredentialsMapper credentialsMapper;
    private final ValidateService validateService;

    @Override
    public FullUserDto login(CredentialsDto credentialsDto) {
        if (credentialsDto == null || credentialsDto.getUsername() == null || credentialsDto.getPassword() == null)
            throw new BadRequestException("A username and password are required.");
        Credentials credentialsToValidate = credentialsMapper.dtoToEntity(credentialsDto);
        User userToValidate = validateService.findUser(credentialsDto.getUsername());
        if (!userToValidate.getCredentials().equals(credentialsToValidate))
            throw new NotAuthorizedException("The provided credentials are invalid.");
        if (userToValidate.getStatus().equals("PENDING")) {
            userToValidate.setStatus("JOINED");
            userRepository.saveAndFlush(userToValidate);
        }
        return fullUserMapper.entityToFullUserDto(userToValidate);
    }

    @Override
    public FullUserDto createUser(Long id, UserRequestDto userRequestDto) {
        Company company = validateService.findCompany(id);
        if (userRequestDto.getCredentials() == null || userRequestDto.getProfile() == null)
            throw new BadRequestException("User request body requires profile and credentials");
        if (userRequestDto.getCredentials().getUsername() == null || userRequestDto.getCredentials().getPassword() == null)
            throw new BadRequestException("User must include credentials (username and password)");
        // Could add userRequestDto.getProfile().getAllThoseFields error handling here
        User user = fullUserMapper.requestDtoToEntity(userRequestDto);
        user.setActive(true);
        user.getCompanies().add(company);
        return fullUserMapper.entityToFullUserDto(userRepository.saveAndFlush(user));
    }

}
