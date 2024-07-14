package com.huaweicloud.auth;

import cn.hutool.jwt.JWT;
import cn.hutool.jwt.signers.JWTSignerUtil;
import com.huaweicloud.model.User;
import com.huaweicloud.model.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Value;
import com.huaweicloud.tinycommon.Crypto;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.Map;
import java.util.Objects;

@RestController
public class AuthController {
    @Autowired
    private UserRepository userRepository;
    @Value("${com.huaweicloud.auth.secret}")
    private String secret;
    @GetMapping("test")
    public String test() {
        throw new HttpClientErrorException(HttpStatus.BAD_REQUEST, "");
    }
    @PostMapping("logout")
    public void logout(
            @RequestBody
            @Validated
            LogoutDTO data){
        // TODO: remove token from redis
    }
    @PostMapping("login")
    public String login(
            @RequestBody
            @Validated
            LoginDTO dto
    ) {
        User user = this.userRepository.findByEmailAndPassword(dto.getEmail(), dto.getPassword());
        if (user==null){
            throw new HttpClientErrorException(
                    HttpStatus.NOT_FOUND,
                    "用户不存在"
            );
        }
        String salt = user.salt;
        Crypto crypto = new Crypto();
        String newHash = crypto.pbkdf2(
                dto.password.toCharArray(),
                salt.getBytes(),
                1000,
                18
        );
        if (!Objects.equals(newHash, user.password)){
            throw new HttpClientErrorException(HttpStatus.BAD_REQUEST,"密码或邮箱错误");
        }
        String token = JWT.create()
                .setPayload("email", dto.getEmail())
                .setSigner(JWTSignerUtil.hs256(this.secret.getBytes()))
                .sign();
        // TODO: storage to redis
        return token;
    }
    
}
