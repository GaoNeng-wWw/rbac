package com.huaweicloud.tinycommon;

public class UserContext {
    private static ThreadLocal<UserInfoForToken> userInfoForTokenThreadLocal = new ThreadLocal<UserInfoForToken>();
    public static String KEY = "USER-INFO-FOR-TOKEN";

    public UserContext(){}

    public static UserInfoForToken getUserInfo() {
        UserInfoForToken info = userInfoForTokenThreadLocal.get();
        userInfoForTokenThreadLocal.remove();
        return info;
    }

    public static void setUserInfo(UserInfoForToken userInfoForToken) {
        userInfoForTokenThreadLocal.set(userInfoForToken);
    }
}
