package com.huaweicloud.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LoginDTO {
    @NotBlank
    @NotNull
    public String email;
    @NotBlank
    @NotNull
    public String password;
}
