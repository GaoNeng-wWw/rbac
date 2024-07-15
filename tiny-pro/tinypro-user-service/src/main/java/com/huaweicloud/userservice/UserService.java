package com.huaweicloud.userservice;

import cn.hutool.core.util.StrUtil;
import cn.hutool.system.UserInfo;
import com.huaweicloud.tinycommon.Crypto;
import com.huaweicloud.model.*;
import com.huaweicloud.userservice.dto.ChangePassword;
import com.huaweicloud.userservice.dto.CreateUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.*;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    private Logger logger = LoggerFactory.getLogger(UserService.class);
    public SafeUserInfo findSafeUserInfoByEmail(String email){
        System.out.println(
                this.userRepository.findByemail(email).email
        );
        User user = this.userRepository.findByemail(email);
        if (user == null){
            return null;
        }
        return new SafeUserInfo(user.id,user.name,user.email,user.createTime,user.updateTime,user.deleteAt,user.role);
    }

    public User createUser(CreateUser data){
        if (
                !Objects.isNull(
                        this.userRepository.findByemail(data.email)
                )
        ){
            throw new HttpClientErrorException(HttpStatus.BAD_REQUEST, "用户存在");
        }
        User user = new User();
        String salt = user.randomBytes(4);
        String password = User.generatePassword(
                data.password,
                salt.getBytes(StandardCharsets.UTF_8),
                1000
        );
        System.out.println(salt);
        System.out.println(password);
        user.name = data.username;
        user.password = password;
        user.email = data.email;
        user.salt = salt;
        Set<Role> roles = new HashSet<>();
        Iterable<Role> rawRoles = this.roleRepository.findAllById(data.roleIds);
        rawRoles.forEach(roles::add);
        user.role = roles;
        this.userRepository.save(user);
        return user;
    }
    public Set<String> getUserPermissions(String email){
        SafeUserInfo user = this.findSafeUserInfoByEmail(email);
        if (user==null) {
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND, "用户不存在");
        }
        Set<Role> roles = user.getRole() == null ? new HashSet<>() : user.getRole();
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
        User user = this.userRepository.findByemail(email);
        if (user==null) {
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND, "用户不存在");
        }
        user.deleteAt = Instant.now();
        this.userRepository.save(user);
    }
    public boolean verifyPassword(
            String password,
            String hash,
            String salt
    ){
        Crypto crypto = new Crypto();
        String newHash = crypto.pbkdf2(
                password,
                salt.getBytes(),
                1000
        );
        return newHash.equals(hash);
    }
    public void updatePassword(ChangePassword data){
        String email = data.email;
        User user = this.userRepository.findByemail(email);
        if (user==null) {
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
        user.password = crypto.pbkdf2(data.newPassword, user.salt.getBytes(), 1000);
        this.userRepository.save(user);
        // TODO: logout
    }
}
