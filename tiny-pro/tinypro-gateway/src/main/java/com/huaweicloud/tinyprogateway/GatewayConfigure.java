package com.huaweicloud.tinyprogateway;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.Set;

@ConfigurationProperties(prefix="tinypro.gateway")
@Component
@Getter
@Setter
public class GatewayConfigure {

    public Set<ConfigurePermission> permission;
}
