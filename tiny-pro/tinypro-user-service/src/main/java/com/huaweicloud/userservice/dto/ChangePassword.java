package com.huaweicloud.userservice.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ChangePassword {
    @NotNull
    @NotBlank
    @Email
    public String email;
    @NotNull(message = "老密码不能为空")
    @NotBlank(message = "老密码不能为空")
    public String oldPassword;
    @NotNull(message = "新密码不能为空")
    @NotBlank(message = "新密码不能为空")
    public String newPassword;
}
