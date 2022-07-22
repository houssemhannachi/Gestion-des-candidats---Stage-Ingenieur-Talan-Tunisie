package com.talan.spring.login.payload.response;

import java.util.List;

public class UserInfoResponse {
    private Long id;
    private String email;

    private String name;

    private List<String> roles;

    public UserInfoResponse(Long id, String email,String name, List<String> roles) {
        this.id = id;
        this.email = email;
        this.name=name;
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<String> getRoles() {
        return roles;
    }
}
