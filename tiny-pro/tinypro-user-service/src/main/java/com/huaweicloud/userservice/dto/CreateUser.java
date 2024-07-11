package com.huaweicloud.userservice.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class CreateUser {
    @NotNull(message = "用户名不能为空")
    @NotBlank(message = "用户名不能为空字符串")
    public String username;
    @NotNull(message = "用户名不能为空")
    @NotBlank(message = "用户名不能为空字符串")
    public String password;
    @NotNull(message = "用户名不能为空")
    @NotBlank(message = "用户名不能为空字符串")
    @Email(message = "不是合法的邮件格式")
    public String email;
    public List<Integer> roleIds;
}



