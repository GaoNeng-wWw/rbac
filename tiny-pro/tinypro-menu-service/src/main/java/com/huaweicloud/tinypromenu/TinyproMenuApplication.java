package com.huaweicloud.tinypromenu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableJpaRepositories(basePackages = "com.huaweicloud.model")
@EntityScan("com.huaweicloud.model")
@EnableTransactionManagement
@SpringBootApplication(scanBasePackages = {"com.huaweicloud.tinycommon", "com.huaweicloud.*"})
@EnableDiscoveryClient
public class TinyproMenuApplication {

    public static void main(String[] args) {
        SpringApplication.run(TinyproMenuApplication.class, args);
    }

}
