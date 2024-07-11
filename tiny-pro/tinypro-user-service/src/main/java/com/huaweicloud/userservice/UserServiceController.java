package com.huaweicloud.userservice;

import com.huaweicloud.model.SafeUserInfo;
import com.huaweicloud.model.User;
import com.huaweicloud.model.UserRepository;
import com.huaweicloud.userservice.dto.CreateUser;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;


@RestController
@RequestMapping("/user")
public class UserServiceController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @PostMapping("/reg")
    public User register(@RequestBody @Valid CreateUser user) {
        return this.userService.createUser(user);
    }
    @GetMapping("/info/{email}")
    public SafeUserInfo getUserInfo(
            @PathVariable("email") String email
    ){
        SafeUserInfo info = this.userService.findSafeUserInfoByEmail(email);
        if (info == null) {
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND,"用户不存在");
        }
        return info;
    }
    @DeleteMapping("/{email}")
    public void deleteUser(
            @PathVariable("email") String email
    ){
        this.userService.deleteUser(email);
    }

}
