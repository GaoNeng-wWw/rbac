package com.huaweicloud.model;

import jakarta.persistence.*;

import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.time.Instant;
import java.util.Arrays;
import java.util.Random;
import java.util.Set;

@Entity(name="user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;
    public String name;
    public String email;
    public String password;
    public Instant createTime;
    public Instant updateTime;
    public long deleteAt;
    public String salt;
    @ManyToMany(targetEntity = Role.class)
    @JoinTable(name="user_role")
    public Set<Role> role;
    public String randomBytes(int len){
        Random random = new Random();
        byte[] bytes = new byte[len];
        random.nextBytes(bytes);
        return Arrays.toString(bytes);
    }
    public String generatePassword(
            final char[] password,
            final byte[] salt,
            final int iterations,
            final int keyLen
    ){
        try {
            SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
            PBEKeySpec spec = new PBEKeySpec(password, salt, iterations, keyLen);
            SecretKey key = skf.generateSecret(spec);
            return Arrays.toString(key.getEncoded());
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            throw new RuntimeException(e);
        }
    }

}
