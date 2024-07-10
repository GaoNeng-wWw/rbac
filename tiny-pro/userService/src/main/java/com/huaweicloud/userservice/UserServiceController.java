package com.huaweicloud.userservice;

import com.huaweicloud.model.User;
import com.huaweicloud.model.UserRepository;
import com.huaweicloud.userservice.dto.CreateUser;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public User getUserInfo(
            @PathVariable("email") String email
    ){
        // TODO
        return this.userService.findUserByEmail(email);
    }
}
