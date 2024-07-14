package com.huaweicloud.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class LogoutDTO {
    @NotBlank
    @NotNull
    String email;
}
