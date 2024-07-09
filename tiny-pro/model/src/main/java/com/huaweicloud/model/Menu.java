package com.huaweicloud.model;

import jakarta.persistence.*;

@Entity
@Table(name="menu")
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;
    @Column()
    String name;
    @Column()
    int order;
    @Column(nullable = true)
    int parentId;
    String menuType;
    @Column(nullable = true)
    String icon;
    String component;
    String path;
}
