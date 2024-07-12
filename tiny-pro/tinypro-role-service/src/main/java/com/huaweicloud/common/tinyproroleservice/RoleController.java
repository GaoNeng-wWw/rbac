package com.huaweicloud.common.tinyproroleservice;

import com.huaweicloud.model.Permission;
import com.huaweicloud.model.PermissionRepository;
import com.huaweicloud.model.Role;
import com.huaweicloud.model.RoleRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
public class RoleController {
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PermissionRepository permissionRepository;
    @PostMapping("")
    public Role createRole(@RequestBody @Validated AddRoleDto data) {
        Role role = new Role();
        role.name = data.name;
        Iterable<Permission> rawPermissions = this.permissionRepository.findAllById(data.permissionIds);
        Set<Permission> permissions = Set.of();
        rawPermissions.forEach(permissions::add);
        role.permission = permissions;
        return roleRepository.save(role);
    }
    @DeleteMapping("")
    public Role deleteRole(
            @RequestBody
            @Valid
            DeleteRoleDTO data
    ){
        Optional<Role> role = this.roleRepository.findById(data.id);
        if (role.isEmpty()){
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND, "角色不存在");
        }
        this.roleRepository.deleteById(data.id);
        return role.get();
    }
    @PatchMapping("")
    public Role updateRole(
            @RequestBody
            @Valid
            UpdateRole data
    ){
        Optional<Role> role = this.roleRepository.findById(data.id);
        if (role.isEmpty()){
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND, "角色不存在");
        }
        role.get().name = data.name;
        Iterable<Permission> rawPermission = this.permissionRepository.findAllById(data.permissionIds);
        Set<Permission> permissions = Set.of();
        rawPermission.forEach(permissions::add);
        role.get().permission = permissions;
        return roleRepository.save(role.get());
    }

    @GetMapping("")
    public List<Role> getAllRoles() {
        Iterable<Role> rawRoles = this.roleRepository.findAll();
        List<Role> roles = new ArrayList<>();
        rawRoles.forEach(roles::add);
        return roles;
    }
}
