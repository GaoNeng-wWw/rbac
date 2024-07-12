package com.huaweicloud.common.tinyproroleservice;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class DeleteRoleDTO {
    @NotNull
    @NotBlank
    public int id;
    @NotNull
    @NotBlank
    public String name;
}
