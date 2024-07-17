package com.huaweicloud.tinycommon;

import de.rtner.misc.BinTools;
import de.rtner.security.auth.spi.PBKDF2Engine;
import de.rtner.security.auth.spi.PBKDF2Parameters;

import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Arrays;

public class Crypto {
    public String pbkdf2(
            String password,
            byte[] salt,
            int iterations
    ){
        PBKDF2Parameters p = new PBKDF2Parameters("HmacSHA256","UTF-8",salt,iterations);
        PBKDF2Engine engine = new PBKDF2Engine(p);
        byte[] dk = engine.deriveKey(password);
        return BinTools.bin2hex(dk);
    }
}
