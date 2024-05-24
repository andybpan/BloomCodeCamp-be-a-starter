package com.hcc.entities;

import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name="authorities")
public class Authority implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "authority")
    private String authority;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Authority() {
    }

    public Authority(String authority, User user) {
        this.authority = authority;
        this.user = user;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @Override
    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Authority authority1 = (Authority) o;
        return id == authority1.id && Objects.equals(authority, authority1.authority) && Objects.equals(user, authority1.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, authority, user);
    }
}
