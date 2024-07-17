package com.huaweicloud.tinypromenu;

import cn.hutool.jwt.JWT;
import cn.hutool.jwt.JWTPayload;
import cn.hutool.jwt.JWTUtil;
import com.huaweicloud.model.*;
import com.huaweicloud.tinycommon.UserContext;
import com.huaweicloud.tinycommon.UserInfoForToken;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.Optional;
import java.util.Set;

@Slf4j
@RestController
public class MenuController {
    @Autowired
    private MenuRepository menuRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping()
    public TreeNodeData[] menu(
            @RequestHeader("Authorization") String _token
    ) {
        String token = _token.replace("Bearer ", "");
        log.info(JWTUtil.parseToken(token).getPayload().toString());
        String email =JWTUtil.parseToken(token).getPayload("email").toString();
        User user = this.userRepository.findByemail(email);
        Set<Menu> rawMenus = new java.util.HashSet<Menu>(Set.of());
        Set<Role> roles = user.getRole();
        roles.forEach(role -> {
            rawMenus.addAll(role.menu);
        });
        return TreeNodeUtils.covertToTree(rawMenus.toArray(new Menu[0]), null);
    }
    @PostMapping()
    public Menu create(@RequestBody @Valid CreateMenuDTO data){
        Menu menu = new Menu();
        menu.setName(data.getName());
        menu.setOrder(data.getOrder());
        menu.setParentId(data.getParentId().isEmpty() ? null : data.getParentId().get());
        menu.setMenuType(data.getMenuType());
        menu.setIcon(data.getIcon());
        menu.setComponent(data.getComponent());
        menu.setPath(data.getPath());
        return this.menuRepository.save(menu);
    }
    @DeleteMapping()
    public Menu deleteMenu(@RequestBody @Valid DeleteMenuDTO data){
        Optional<Menu> menu = this.menuRepository.findById(data.id);
        this.menuRepository.deleteById(data.id);
        return menu.orElse(null);
    }

    @PatchMapping()
    public boolean updateMenu(@RequestBody @Valid UpdateMenuDTO data){
        Menu menu = this.menuRepository.findById(data.id).orElse(null);
        if (menu == null) {
            throw new HttpClientErrorException(HttpStatus.BAD_REQUEST, "菜单项不存在");
        }
        if (data.getName().isPresent()){
            menu.setName(data.getName().get());
        }
        if (data.getOrder().isPresent()){
            menu.setOrder(data.getOrder().get());
        }
        if (data.getParentId().isPresent()){
            menu.setParentId(data.getParentId().get());
        }
        if (data.getMenuType().isPresent()){
            menu.setMenuType(data.getMenuType().get());
        }
        if (data.getIcon().isPresent()){
            menu.setIcon(data.getIcon().get());
        }
        if (data.getPath().isPresent()){
            menu.setPath(data.getPath().get());
        }
        this.menuRepository.save(menu);
        return true;
    }
}
