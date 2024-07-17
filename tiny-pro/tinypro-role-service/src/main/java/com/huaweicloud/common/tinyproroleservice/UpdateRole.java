package com.huaweicloud.common.tinyproroleservice;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.Set;

public class UpdateRole {
    @NotNull
    @NotBlank
    public int id;
    @NotNull
    @NotBlank
    public String name;
    @NotNull
    @NotBlank
    public Set<Integer> permissionIds;
    @NotNull
    @NotBlank
    public Set<Integer> menuIds;
}
