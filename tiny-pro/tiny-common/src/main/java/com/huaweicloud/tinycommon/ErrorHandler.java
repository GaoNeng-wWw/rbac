package com.huaweicloud.tinycommon;

import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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
    @ExceptionHandler(HttpClientErrorException.class)
    public String handleException(HttpClientErrorException e) {
        this.res.setStatus(e.getStatusCode().value());
        JSONObject json = JSONUtil.createObj();
        json.set("statusCode", e.getStatusCode().value());
        json.set("message", e.getStatusText());
        return json.toJSONString(0);
    }
}
