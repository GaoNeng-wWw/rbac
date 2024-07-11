package com.huaweicloud.permission;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class UpdatePermissionDTO {
    @NotNull
    @NotBlank
    public int id;
    @NotNull
    @NotBlank
    public String name;
    @NotNull
    @NotBlank
    public String desc;
}
