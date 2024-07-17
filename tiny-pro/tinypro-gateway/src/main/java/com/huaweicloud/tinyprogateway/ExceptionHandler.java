package com.huaweicloud.tinyprogateway;

import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.reactive.error.ErrorWebExceptionHandler;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.buffer.DataBufferFactory;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Objects;

@Slf4j
@Order(-1)
@RequiredArgsConstructor
@Component
public class ExceptionHandler implements ErrorWebExceptionHandler  {

    @Override
    @NonNull
    public Mono<Void> handle(ServerWebExchange exchange, Throwable ex) {
        ServerHttpResponse response = exchange.getResponse();
        if (response.isCommitted()){
            return Mono.error(ex);
        }
        log.error(ex.getMessage());
        response.getHeaders().setContentType(MediaType.APPLICATION_JSON);
        if (ex instanceof ResponseStatusException){
            response.setStatusCode(((ResponseStatusException) ex).getStatusCode());
        }
        return response.writeWith(
                Mono.fromSupplier(()->{

                    DataBufferFactory buffer = response.bufferFactory();
                    JSONObject json = JSONUtil.createObj();
                    json.set("statusCode", Objects.requireNonNull(response.getStatusCode()).value());
                    HttpStatusCode statusCode = response.getStatusCode();
                    String msg;
                    switch (statusCode.value()) {
                        case 400: {
                            msg = "参数错误";
                            break;
                        }
                        case 401: {
                            msg = "未登录";
                            break;
                        }
                        case 403: {
                            msg = "权限不足";
                            break;
                        }
                        case 404: {
                            msg = "不存在";
                            break;
                        }
                        default: {
                            msg = ex.getMessage();
                            break;
                        }

                    }
                    json.set("message", msg);
                    return buffer.wrap(
                            json.toJSONString(0).getBytes()
                    );
                })
        );
    }
}
