package com.huaweicloud.permission;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class DeletePermissionDTO {
    @NotNull
    @NotBlank
    public int id;
}
