package com.huaweicloud.model;

import jakarta.persistence.*;

@Entity(name="permission")
public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;
    @Column(name="`desc`")
    public String desc;
    @Column()
    public String name;
}
