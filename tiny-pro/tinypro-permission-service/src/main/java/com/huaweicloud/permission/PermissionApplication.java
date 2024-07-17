package com.huaweicloud.permission;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableDiscoveryClient
@EntityScan("com.huaweicloud.model")
@EnableJpaRepositories(basePackages = "com.huaweicloud.model")
@SpringBootApplication(scanBasePackages = {"com.huaweicloud.tinycommon", "com.huaweicloud.*"})
public class PermissionApplication {
    public static void main(String[] args) {
        SpringApplication.run(PermissionApplication.class, args);
    }

}
