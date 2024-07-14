package com.huaweicloud.tinycommon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.huaweicloud.tinycommon")
public class TinyCommonApplication {

    public static void main(String[] args) {
        SpringApplication.run(TinyCommonApplication.class, args);
    }

}
