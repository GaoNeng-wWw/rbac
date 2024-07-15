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
public class UpdateMenuDTO {
    public Optional<Integer> order;
    public Optional<String> menuType;
    public Optional<String> name;
    public Optional<String> path;
    public Optional<String> component;
    public Optional<String> icon;
    public Optional<Integer> parentId;
    public Integer id;
}
