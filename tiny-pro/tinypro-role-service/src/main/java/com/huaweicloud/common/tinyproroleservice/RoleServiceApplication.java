package com.huaweicloud.common.tinyproroleservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EntityScan("com.huaweicloud.model")
@EnableJpaRepositories(basePackages = "com.huaweicloud.model")
@SpringBootApplication(scanBasePackages = {"com.huaweicloud.tinycommon", "com.huaweicloud.*"})
@EnableDiscoveryClient
public class RoleServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(RoleServiceApplication.class, args);
    }

}
