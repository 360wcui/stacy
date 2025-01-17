package com.ussf.dingo.model;
import javax.persistence.*;
@Entity
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(length = 500)
    private String description;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "userId")
    private Long userId;

    public Item() {
        quantity = 0;
        description = "No description";
        userId = 0L;
    }

    public Item(Long userId, String name, String description, int quantity) {
        this.userId = userId;
        this.quantity = quantity;
        this.description = description;
        this.name = name;
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}