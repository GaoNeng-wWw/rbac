package com.huaweicloud.permission;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AddPermissionDTO {
    @NotBlank
    @NotNull
    String name;
    @NotBlank
    @NotNull
    String desc;
}
