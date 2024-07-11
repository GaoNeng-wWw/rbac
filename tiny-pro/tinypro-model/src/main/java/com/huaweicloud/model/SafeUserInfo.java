package com.huaweicloud.model;

import lombok.*;

import java.time.Instant;
import java.util.Set;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SafeUserInfo{
    public int id;
    public String name;
    public String email;
    public Instant createTime;
    public Instant updateTime;
    public Instant deleteAt;
    public Set<Role> role;
}