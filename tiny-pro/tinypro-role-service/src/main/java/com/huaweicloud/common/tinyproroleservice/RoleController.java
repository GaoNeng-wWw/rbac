package com.huaweicloud.common.tinyproroleservice;

import com.huaweicloud.model.*;
import jakarta.validation.Valid;
import jakarta.ws.rs.PathParam;
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
    @Autowired
    private MenuRepository menuRepository;
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
        Optional<Role> roleOptional = this.roleRepository.findById(data.id);
        if (roleOptional.isEmpty()){
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND, "角色不存在");
        }
        this.roleRepository.deleteById(data.id);
        return roleOptional.get();
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
        if (!data.permissionIds.isEmpty()){
            Iterable<Permission> rawPermission = this.permissionRepository.findAllById(data.permissionIds);
            Set<Permission> permissions = Set.of();
            rawPermission.forEach(permissions::add);
            role.get().setPermission(permissions);
        }
        if (!data.menuIds.isEmpty()) {
            Iterable<Menu> rawMenus = this.menuRepository.findAllById(data.menuIds);
            Set<Menu> menus = Set.of();
            rawMenus.forEach(menus::add);
            role.get().setMenu(menus);
        }
        return roleRepository.save(role.get());
    }

    @GetMapping("")
    public List<Role> getAllRoles() {
        Iterable<Role> rawRoles = this.roleRepository.findAll();
        List<Role> roles = new ArrayList<>();
        rawRoles.forEach(roles::add);
        return roles;
    }

    @GetMapping("/info/{id}")
    public Role getRoleInfo(@PathParam("id") int id){
        Optional<Role> roleOptional =  this.roleRepository.findById(id);
        if (roleOptional.isEmpty()){
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND, "角色不存在");
        }
        Role role = roleOptional.get();
        return role.getRole();
    }
}
