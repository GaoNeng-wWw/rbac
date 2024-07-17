package com.huaweicloud.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

import java.util.Set;

@Data
@Getter
@Entity(name="role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;
    @Column()
    public String name;
    @ManyToMany(targetEntity = Permission.class, fetch = FetchType.LAZY)
    @JoinTable(name = "role_permission")
    public Set<Permission> permission;
    @Getter
    @ManyToMany(targetEntity = Menu.class, fetch = FetchType.LAZY)
    @JoinTable(name = "role_menu")
    public Set<Menu> menu;

    public ExcludeMenuRole getExcludeMenuRole(){
        return new ExcludeMenuRole(
                this.id,
                this.name,
                this.permission
        );
    }

    public Role getRole(){
        Role role = new Role();
        role.id = this.id;
        role.name = this.name;
        role.permission = this.permission;
        role.menu = role.getMenu();
        return role;
    }


}
