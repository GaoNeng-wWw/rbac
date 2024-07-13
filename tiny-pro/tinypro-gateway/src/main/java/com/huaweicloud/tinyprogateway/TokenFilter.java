package com.huaweicloud.tinyprogateway;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
public class TokenFilter implements GlobalFilter, Ordered {

    @Autowired
    ObjectMapper objectMapper;
    @Value("${tinypro.gateway.token.whitelist:}")
    private List<String> whitelist;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest req = exchange.getRequest();
        String path = req.getPath().pathWithinApplication().value();
        System.out.println(whitelist);
        if (whitelist.contains(path)) {
            return chain.filter(exchange);
        }
        HttpHeaders header = req.getHeaders();
        String token = header.getFirst("Authorization");
        ServerHttpResponse resp = exchange.getResponse();
        if (token == null || token.isEmpty()){
            Map<String, Object> map = new HashMap<>();
            String res = "";
            resp.setStatusCode(HttpStatus.UNAUTHORIZED);
            resp.getHeaders().add("Content-Type", "application/json;charset=utf-8");
            map.put("statusCode", HttpStatus.UNAUTHORIZED.value());
            map.put("message", "登陆过期");
            try {
                res = objectMapper.writeValueAsString(map);
                System.out.println(res);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }

            DataBuffer buffer = resp.bufferFactory().wrap(res.getBytes(StandardCharsets.UTF_8));
            return resp.writeWith(Flux.just(buffer));
        }
        // TODO: token expire throw too
        // TODO: not jwt token throw too
        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return 0;
    }
}
