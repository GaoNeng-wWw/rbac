package com.huaweicloud.tinyprogateway;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.huaweicloud.model.Role;
import com.huaweicloud.model.User;
import com.huaweicloud.model.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.RequestPath;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.lang.annotation.Annotation;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Slf4j
@Component
public class PermissionFilter implements GlobalFilter, Ordered {
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private GatewayConfigure configure;
    private final AntPathMatcher antPathMatcher = new AntPathMatcher();

    @Value("${tinypro.gateway.token.whitelist:}")
    private List<String> whitelist;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        ServerHttpResponse response = exchange.getResponse();
        String method = request.getMethod().name();
        String path = request.getPath().pathWithinApplication().value();
        if (whitelist.contains(path)) {
            return chain.filter(exchange);
        }
        Set<ConfigurePermission> configurePermissionSet = this.configure.getPermission();
        Optional<ConfigurePermission> optionalConfigurePermission = Optional.empty();
        for (ConfigurePermission configurePermissionItem : configurePermissionSet) {
            if (antPathMatcher.match(configurePermissionItem.getPath(), path) && method.equals(configurePermissionItem.getMethod())) {
                optionalConfigurePermission = Optional.of(configurePermissionItem);
            }
        }
        if (optionalConfigurePermission.isEmpty()) {
            return chain.filter(exchange);
        }
        String email = exchange.getAttribute("email");
        User user = this.userRepository.findByemail(email);
        if (user == null){
            Map<String, Object> res = new HashMap<>();
            res.put("statusCode", HttpStatus.FORBIDDEN.value());
            res.put("message", "权限不足");
            response.setStatusCode(HttpStatus.FORBIDDEN);
            try {
                return response.writeWith(
                        Flux.just(
                                response.bufferFactory().wrap(
                                        objectMapper.writeValueAsString(res).getBytes(StandardCharsets.UTF_8)
                                )
                        )
                );
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }

        Set<Role> roles = user.role;
        Set<String> userPermissions = new HashSet<>();
        roles.forEach(role ->
                role.permission.forEach(permission ->
                        userPermissions.add(permission.name)
                )
        );
        if (userPermissions.contains("*")){
            return chain.filter(exchange);
        }
        ConfigurePermission configurePermission = optionalConfigurePermission.get();
        Set<String> configurePermissions = configurePermission.permission.orElseGet(Set::of);
        String logic = configurePermission.logic;
        Optional<Boolean> deny = Optional.empty();
        if (configurePermissions.isEmpty()) {
            return chain.filter(exchange);
        }
        for (String p : configurePermissions) {
            if (logic.equalsIgnoreCase("and")) {
                if (deny.isPresent()) {
                    deny = Optional.of(deny.get() && userPermissions.contains(p));
                    continue;
                }
                deny = Optional.of(userPermissions.contains(p));
            }
            if (logic.equalsIgnoreCase("or")) {
                if (deny.isPresent()) {
                    deny = Optional.of(deny.get() || userPermissions.contains(p));
                    continue;
                }
                deny = Optional.of(userPermissions.contains(p));
            }
        }
        if (deny.isPresent()) {
            if (!deny.get()){
                return chain.filter(exchange);
            }
            Map<String, Object> res = new HashMap<>();
            response.setStatusCode(HttpStatus.FORBIDDEN);
            res.put("statusCode", HttpStatus.FORBIDDEN.value());
            res.put("message", "权限不足");
            try {
                return response.writeWith(
                        Flux.just(
                                response.bufferFactory().wrap(
                                        objectMapper.writeValueAsString(res).getBytes(StandardCharsets.UTF_8)
                                )
                        )
                );
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }
        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return 1;
    }
}
