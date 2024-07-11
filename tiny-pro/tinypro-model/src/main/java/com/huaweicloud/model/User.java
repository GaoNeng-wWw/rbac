package com.huaweicloud.model;
import de.rtner.misc.BinTools;
import de.rtner.security.auth.spi.PBKDF2Engine;
import de.rtner.security.auth.spi.PBKDF2Parameters;
import jakarta.persistence.*;
import java.math.BigInteger;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.Set;
import cn.hutool.core.util.RandomUtil;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.UpdateTimestamp;

@Entity(name="user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;
    @Column()
    public String name;
    @Column()
    public String email;
    @Column()
    public String password;
    @Column()
    @CreationTimestamp()
    public Instant createTime;
    @Column()
    @UpdateTimestamp()
    public Instant updateTime;
    @Column()
    public Instant deleteAt;
    @Column()
    public String salt;
    @ManyToMany(targetEntity = Role.class)
    @JoinTable(name="user_role")
    public Set<Role> role;
    public byte[] randomBytes(int len){
        return RandomUtil.randomString(len).getBytes();
    }
    public static boolean verifyPassword(
            String hash,
            String salt,
            String password,
            int iterations
    ){
        String newHash = User.generatePassword(
                password,
                salt.getBytes(),
                iterations
        );
        return newHash.equals(hash);
    }
    public static String generatePassword(
            final String password,
            final byte[] salt,
            final int iterations
    ){
        PBKDF2Parameters p = new PBKDF2Parameters("HmacSHA256","UTF-8",salt,iterations);
        PBKDF2Engine engine = new PBKDF2Engine(p);
        byte[] dk = engine.deriveKey(password);
        return BinTools.bin2hex(dk);
    }
    private static String toHex(byte[] array) throws NoSuchAlgorithmException
    {
        BigInteger bi = new BigInteger(1, array);
        String hex = bi.toString(16);

        int paddingLength = (array.length * 2) - hex.length();
        if(paddingLength > 0)
        {
            return String.format("%0"  +paddingLength + "d", 0) + hex;
        }else{
            return hex;
        }
    }

}
