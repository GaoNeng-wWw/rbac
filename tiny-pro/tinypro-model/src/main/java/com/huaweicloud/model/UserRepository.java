package com.huaweicloud.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.huaweicloud.model.SafeUserInfo;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByemail(String email);
    @Query(value = "select id,role from user where email=:email")
    List<SafeUserInfo> getSafeUserInfoByEmail(@Param("email") String email);
    User findByEmailAndPassword(String email, String password);
}
