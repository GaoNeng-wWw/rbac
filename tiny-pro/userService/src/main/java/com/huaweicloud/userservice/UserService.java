package com.huaweicloud.userservice;

import cn.hutool.core.codec.Base64;
import cn.hutool.core.util.StrUtil;
import com.huaweicloud.Crypto;
import com.huaweicloud.model.*;
import com.huaweicloud.userservice.dto.ChangePassword;
import com.huaweicloud.userservice.dto.CreateUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    private Logger logger = LoggerFactory.getLogger(UserService.class);
    public User findUserByEmail(String email){
        return this.userRepository.findByemail(email);
    }

    public User createUser(CreateUser data){
        if (
                !Objects.isNull(
                        this.findUserByEmail(data.email)
                )
        ){
            throw new HttpClientErrorException(HttpStatus.BAD_REQUEST, "用户存在");
        }
        User user = new User();
        byte[] salt = user.randomBytes(4);
        String password = User.generatePassword(
                data.password,
                salt,
                1000
        );
        user.name = data.username;
        user.password = password;
        user.email = data.email;
        user.salt = StrUtil.str(salt, StandardCharsets.UTF_8);
        Set<Role> roles = new HashSet<>();
        Iterable<Role> rawRoles = this.roleRepository.findAllById(data.roleIds);
        rawRoles.forEach(roles::add);
        user.role = roles;
        this.userRepository.save(user);
        return user;
    }
    public Set<String> getUserPermissions(String email){
        User user = this.findUserByEmail(email);
        Set<Role> roles = user.role == null ? new HashSet<>() : user.role;
        Set<String> permissions = new HashSet<>();
        for (Role role : roles) {
            Set<Permission> permission = role.permission;
            permission.forEach(p -> {
                permissions.add(p.name);
            });
        }
        return permissions;
    }
    public void deleteUser(String email){
        User user = this.findUserByEmail(email);
        user.deleteAt = new Date().getTime();
        this.userRepository.save(user);
    }
    public boolean verifyPassword(
            String password,
            String hash,
            String salt
    ){
        Crypto crypto = new Crypto();
        String newHash = crypto.pbkdf2(
                password.toCharArray(),
                salt.getBytes(),
                1000,
                18
        );
        return newHash.equals(hash);
    }
    public void updatePassword(ChangePassword data){
        String email = data.email;
        User user = this.findUserByEmail(email);
        if (Objects.isNull(user)) {
            throw new HttpClientErrorException(
                    HttpStatus.NOT_FOUND,
                    "用户不存在"
            );
        }
        if (
                !this.verifyPassword(
                        data.oldPassword,
                        user.password,
                        user.salt
                )
        ) {
            throw new HttpClientErrorException(HttpStatus.BAD_REQUEST, "旧密码错误");
        }
        Crypto crypto = new Crypto();
        user.password = crypto.pbkdf2(data.newPassword.toCharArray(), user.salt.getBytes(), 1000,18);
        this.userRepository.save(user);
        // TODO: logout
    }
}
