package com.huaweicloud.tinyprogateway;

import com.huaweicloud.model.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.nio.charset.StandardCharsets;
import java.sql.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@SpringBootApplication
@EnableDiscoveryClient
@EnableJpaRepositories(basePackages = "com.huaweicloud.model")
@EntityScan("com.huaweicloud.model")
@EnableConfigurationProperties
@Slf4j
public class GatewayApplication implements ApplicationRunner {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PermissionRepository permissionRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        User user = this.userRepository.findByemail("admin@no-reply.com");
        if (user != null){
            return;
        }
        List<String> modules = List.of("user", "permission", "role", "menu");
        List<String> actions = List.of("add", "create", "remove", "update", "delete", "query");
        Permission adminPermission = new Permission();
        adminPermission.name = "*";
        adminPermission.desc = "admin permission";
        this.permissionRepository.save(adminPermission);
        Set<Permission> permissions = new java.util.HashSet<>(Set.of());
        for (String module : modules) {
            for (String action : actions) {
                Permission permission = new Permission();
                permission.name = module + ":" + action;
                permission.desc = "";
                log.info("Add permission: " + permission + "success!");
                permissions.add(this.permissionRepository.save(permission));
            }
        }

        Role adminRole = new Role();
        adminRole.name = "admin";
        adminRole.permission = Set.of(adminPermission);
        adminRole.menu = Set.of();
        this.roleRepository.save(adminRole);

        User admin = new User();
        admin.email = "admin@no-reply.com";
        admin.salt = admin.randomBytes(4);
        admin.password = User.generatePassword(
                "admin",
                admin.salt.getBytes(StandardCharsets.UTF_8),
                1000
        );
        admin.name = "admin";
        admin.role = Set.of(adminRole);
        this.userRepository.save(admin);
        log.info("[APP]: create admin user success");
        log.info("[APP]: email: " + admin.email);
        log.info("[APP]: password: admin");
    }

    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }

}
