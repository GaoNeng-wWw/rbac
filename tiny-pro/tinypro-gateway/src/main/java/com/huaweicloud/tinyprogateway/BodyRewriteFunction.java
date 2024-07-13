package com.huaweicloud.tinyprogateway;

import cn.hutool.extra.tokenizer.Result;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.reactivestreams.Publisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.factory.rewrite.RewriteFunction;
import org.springframework.cloud.gateway.support.ServerWebExchangeUtils;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
public class BodyRewriteFunction implements RewriteFunction<byte[],byte[]> {
    @Autowired
    ObjectMapper objectMapper;
    @Override
    public Publisher<byte[]> apply(ServerWebExchange exchange, byte[] bytes) {
        ServerHttpResponse rep = exchange.getResponse();
        String body = new String(bytes);
        log.error(body);
        log.debug(String.valueOf(ServerWebExchangeUtils.isAlreadyRouted(exchange)));
        if (ServerWebExchangeUtils.isAlreadyRouted(exchange)){
            JSONObject obj = JSONUtil.parseObj(body);

            int statusCode= (int) obj.get("status");
            String message = (String) obj.get("error");
            JSONObject ret = new JSONObject();
            ret.put("statusCode",statusCode);
            ret.put("message",message);
            return Mono.just(
                    JSONUtil.toJsonStr(ret).getBytes()
            );
        }
        return Mono.just(bytes);
    }
}
