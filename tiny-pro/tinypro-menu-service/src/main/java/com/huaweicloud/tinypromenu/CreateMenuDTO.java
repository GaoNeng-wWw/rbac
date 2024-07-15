package com.huaweicloud.tinypromenu;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Optional;

@Data
@Getter
@Setter
public class CreateMenuDTO {
    @NotBlank
    @NotNull
    @PositiveOrZero
    public Integer order;
    @NotBlank
    @NotNull
    public String menuType;
    @NotBlank
    @NotNull
    public String name;
    @NotBlank
    @NotNull
    public String path;
    @NotBlank
    @NotNull
    public String component;
    @NotBlank
    @NotNull
    public String icon;
    public Optional<Integer> parentId;
}
