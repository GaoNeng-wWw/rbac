package com.huaweicloud.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
@Entity(name="menu")
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Column()
    String name;
    @Column(name = "`order`")
    Integer order;
    @Column(nullable = true)
    Integer parentId;
    @Column()
    String menuType;
    @Column(nullable = true)
    String icon;
    @Column()
    String component;
    @Column()
    String path;
}
