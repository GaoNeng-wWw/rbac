package com.huaweicloud.common.tinyproroleservice;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class AddRoleDto {
    @NotBlank
    @NotNull
    String name;
    @NotBlank
    @NotNull
    List<Integer> permissionIds;
}
