package com.huaweicloud.tinypromenu;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class DeleteMenuDTO {
    @NotNull
    @NotBlank
    public Integer id;
    @NotNull
    @NotBlank
    public String name;
}
