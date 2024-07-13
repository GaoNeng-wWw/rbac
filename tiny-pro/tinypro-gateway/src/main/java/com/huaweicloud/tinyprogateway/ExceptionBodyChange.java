package com.huaweicloud.tinyprogateway;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.filter.factory.rewrite.ModifyResponseBodyGatewayFilterFactory;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
@Slf4j
@Order(-1)
public class ExceptionBodyChange implements GlobalFilter {

    private GatewayFilter f;

    public ExceptionBodyChange(
            ModifyResponseBodyGatewayFilterFactory factory,
            BodyRewriteFunction rewriteFunction
    ) {
        this.f = factory.apply(
                new ModifyResponseBodyGatewayFilterFactory.Config()
                        .setRewriteFunction(rewriteFunction)
                        .setInClass(byte[].class)
                        .setOutClass(byte[].class)
        );
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        return f.filter(exchange, chain);
    }
}