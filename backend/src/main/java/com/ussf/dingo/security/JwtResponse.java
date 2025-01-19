package com.ussf.dingo.security;

import com.ussf.dingo.model.User;
import lombok.Data;

@Data
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long userId;

    public JwtResponse(String accessToken, Long userId) {
        this.token = accessToken;
        this.userId = userId;
    }

    public JwtResponse() {
        this.token = "";
        this.userId = 0L;
    }


}

