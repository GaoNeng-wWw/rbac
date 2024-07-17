package com.huaweicloud.tinycommon;

import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;


@Slf4j
@RestControllerAdvice
public class ErrorHandler {
    @Autowired
    private HttpServletRequest request;
    @Autowired
    private HttpServletResponse res;
    @ExceptionHandler(Exception.class)
    public String exception(Exception e) {
        JSONObject json = JSONUtil.createObj();
        json.set("statusCode", 500);
        json.set("message", "内部错误");
        log.error(e.getMessage(), e);
        this.res.setStatus(500);
        return json.toString();
    }
    @ExceptionHandler(MissingServletRequestParameterException.class)
    public String missParamException(MissingServletRequestParameterException e) {
        String name = e.getParameterName();
        JSONObject json = JSONUtil.createObj();
        json.set("statusCode", e.getStatusCode().value());
        json.set("message", "缺少参数: " + name );
        log.error(e.getMessage(), e);
        this.res.setStatus(e.getStatusCode().value());
        return json.toString();
    }
    @ExceptionHandler(HttpClientErrorException.class)
    public String handleException(HttpClientErrorException e) {
        this.res.setStatus(e.getStatusCode().value());
        JSONObject json = JSONUtil.createObj();
        json.set("statusCode", e.getStatusCode().value());
        json.set("message", e.getStatusText());
        log.error(e.getMessage(), e);
        return json.toJSONString(0);
    }
}
