package com.huaweicloud.permission;

import com.huaweicloud.model.Permission;
import com.huaweicloud.model.PermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/permission")
public class PermissionController {
    @Autowired
    private PermissionRepository permissionRepository;

    @PostMapping("")
    public Permission addPermission(@RequestBody @Validated AddPermissionDTO data) {
        Permission permission = new Permission();
        permission.name=data.getName();
        permission.desc=data.getDesc();
        return this.permissionRepository.save(permission);
    }
    @DeleteMapping("")
    public Permission deletePermission(@RequestBody @Validated DeletePermissionDTO data) {
        Optional<Permission> permission = this.permissionRepository.findById(data.id);
        if (permission.isEmpty()) {
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND, "权限不存在");
        }
        this.permissionRepository.deleteById(data.id);
        return permission.get();
    }
    @PatchMapping("")
    public Permission updatePermission(@RequestBody @Validated UpdatePermissionDTO data) {
        Optional<Permission> permission = this.permissionRepository.findById(data.id);
        if (permission.isEmpty()) {
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND, "权限不存在");
        }
        permission.get().name=data.name;
        permission.get().desc=data.desc;
        return this.permissionRepository.save(permission.get());
    }
    @GetMapping("")
    public List<Permission> getAllPermissions() {
        List<Permission> permissions = new ArrayList<>();
        this.permissionRepository.findAll().forEach(permissions::add);
        return permissions;
    }
}
