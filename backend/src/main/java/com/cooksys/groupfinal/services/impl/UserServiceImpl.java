package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Credentials;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.BasicUserMapper;
import com.cooksys.groupfinal.mappers.CredentialsMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.UserService;
import com.cooksys.groupfinal.services.ValidateService;
import lombok.RequiredArgsConstructor;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final FullUserMapper fullUserMapper;
    private final BasicUserMapper basicUserMapper;
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
//        if (userToValidate.getStatus().equals("PENDING")) {
//            userToValidate.setStatus("JOINED");
//        }
        userRepository.saveAndFlush(userToValidate);
        return fullUserMapper.entityToFullUserDto(userToValidate);
    }

    @Override
    public FullUserDto createUser(Long id, UserRequestDto userRequestDto) {

        Company company = validateService.findCompany(id);
        if (userRequestDto.getCredentials() == null || userRequestDto.getProfile() == null ||
                userRequestDto.getCredentials().getUsername().isEmpty() ||
                userRequestDto.getCredentials().getPassword().isEmpty() ||
                userRequestDto.getProfile().getFirstName().isEmpty() ||
                userRequestDto.getProfile().getLastName().isEmpty() ||
                userRequestDto.getProfile().getEmail().isEmpty()) {
            throw new BadRequestException("missing profile and/or credentials");
        }
        User user = fullUserMapper.requestDtoToEntity(userRequestDto);
        user.setActive(true);
        user.getCompanies().add(company);
        try {
            return fullUserMapper.entityToFullUserDto(userRepository.saveAndFlush(user));
        } catch (RuntimeException e) {
            throw new BadRequestException("user with provided username already exists");
        }
    }

    @Override
    public BasicUserDto updateUser(Long id, UserRequestDto userRequestDto) {
        User user = validateService.findUser(id);
        if(userRequestDto.getCredentials() != null) {
            if(userRequestDto.getCredentials().getPassword() != null) {
                user.getCredentials().setPassword(userRequestDto.getCredentials().getPassword());
                user.setStatus("JOINED");
            }
            if(userRequestDto.getCredentials().getUsername() != null)
                user.getCredentials().setUsername(userRequestDto.getCredentials().getUsername());
        }
        if(userRequestDto.getProfile() != null) {
            if(userRequestDto.getProfile().getEmail() != null)
                user.getProfile().setEmail(userRequestDto.getProfile().getEmail());
            if(userRequestDto.getProfile().getPhone() != null)
                user.getProfile().setPhone(userRequestDto.getProfile().getPhone());
            if(userRequestDto.getProfile().getFirstName() != null)
                user.getProfile().setFirstName(userRequestDto.getProfile().getFirstName());
            if(userRequestDto.getProfile().getLastName() != null)
                user.getProfile().setLastName(userRequestDto.getProfile().getLastName());
        }
        userRepository.saveAndFlush(user);
        return basicUserMapper.entityToBasicUserDto(user);
    }

}
