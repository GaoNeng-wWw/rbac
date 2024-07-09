package com.huaweicloud.model;

import jakarta.persistence.*;

@Entity
@Table(name = "permission")
public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;
    @Column()
    public String desc;
    @Column()
    public String name;
}
