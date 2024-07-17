package com.huaweicloud.model;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Data
@Getter
@Setter
@RequiredArgsConstructor
public class ExcludeMenuRole {
    private Integer id;
    private String name;
    private Set<Permission> permission;

    public ExcludeMenuRole(Integer id, String name, Set<Permission> permission) {
        this.id = id;
        this.name = name;
        this.permission = permission;
    }
}
