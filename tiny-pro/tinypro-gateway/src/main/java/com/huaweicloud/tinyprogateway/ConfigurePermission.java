package com.huaweicloud.tinyprogateway;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Optional;
import java.util.Set;

@Data
@Getter
@Setter
public class ConfigurePermission {
    /**
     * 请求路由
     */
    public String path;
    /**
     * 请求方式
     */
    public String method;
    /**
     * <p>
     *  AND - 满足所有权限
     *  </p>
     *  <p>
     *  OR - 满足一项
     *  </p>
     *  <ul>
     *      <li>AND</li>
     *      <li>OR</li>
     *  </ul>
     */
    public String logic;
    /**
     * <p>权限名, 不需要鉴权留空即可</p>
     */
    public Optional<Set<String>> permission;
}
