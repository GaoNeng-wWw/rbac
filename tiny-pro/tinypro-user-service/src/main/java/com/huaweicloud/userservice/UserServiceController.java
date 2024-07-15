package com.huaweicloud.userservice;

import com.huaweicloud.model.SafeUserInfo;
import com.huaweicloud.model.User;
import com.huaweicloud.model.UserRepository;
import com.huaweicloud.userservice.dto.CreateUser;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import com.huaweicloud.tinycommon.ErrorHandler;

import java.util.Set;

@RestController
public class UserServiceController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

    @Value("tinypro.user.pageSize")
    int pageSize;

    @GetMapping("/")
    public Set<User> getAllUser(
            @RequestParam("page") int page
    ){
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        Pageable pager = PageRequest.of(page, pageSize, sort);
        return this.userRepository.findAll(pager).toSet();
    }
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

//    @ExceptionHandler({HttpClientErrorException.class,})
    @GetMapping("/test")
    public void test(){
        System.out.println("test");
        throw new HttpClientErrorException(HttpStatus.BAD_REQUEST, "测试");
    }
}
