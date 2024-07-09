package com.huaweicloud.model;

import jakarta.persistence.*;

import java.util.Set;

@Entity(name="role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;
    @Column()
    public String name;
    @ManyToMany(targetEntity = Permission.class)
    @JoinTable(name = "role_permission")
    public Set<Permission> permission;
    @ManyToMany(targetEntity = Menu.class)
    @JoinTable(name = "role_menu")
    public Set<Menu> menu;
}
