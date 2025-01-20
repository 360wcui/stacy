// MyNewItemModal Controller
package com.ussf.dingo.controller;

import com.ussf.dingo.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import com.ussf.dingo.model.Item;

@RestController
@RequestMapping("/api/item")
public class ItemController {
    @Autowired
    private ItemRepository itemRepository;

    @GetMapping("/user/{userId}")
    public List<Item> getUserItems(@PathVariable Long userId) {
        System.out.println("gets items for user: " + userId);
        List<Item> list = itemRepository.findByUserId(userId);
        return list;
    }

    @PreAuthorize("hasRole('USER')")  // Check for role-based access
    @PostMapping
    public Item createItem(@RequestBody Item item) {
        System.out.println("saving a new item");
        return itemRepository.save(item);
    }

    @PreAuthorize("hasRole('USER')")  // Check for role-based access
    @PutMapping("/user/{userId}")
    public Item saveUserItems(@PathVariable Long userId, @RequestBody Item newItem) {
        System.out.println("Update item for user " + userId);
        newItem.setUserId(userId);
        return itemRepository.save(newItem);
    }

    @GetMapping
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    @GetMapping("/{id}")
    public Item getItemById(@PathVariable Long id) {
        System.out.println("get this item: " + id);
        return itemRepository.findById(id).orElseThrow(() -> new RuntimeException("Item not found"));
    }

    @PreAuthorize("hasRole('USER')")  // Check for role-based access
    @PutMapping("/{id}")
    public Item updateItem(@PathVariable Long id, @RequestBody Item updatedItem) {
        System.out.println("Editing an item");
        Item item = itemRepository.findById(id).orElseThrow(() -> new RuntimeException("Item not found"));
        System.out.println("An item is edited");
        item.setName(updatedItem.getName());
        item.setDescription(updatedItem.getDescription());
        item.setQuantity(updatedItem.getQuantity());
        return itemRepository.save(item);
    }

    @PreAuthorize("hasRole('USER')")  // Check for role-based access
    @PutMapping("/add/{userId}")
    public Item addItem(@PathVariable Long userId, @RequestBody Item newItem) {
        System.out.println("gets here add item");
        System.out.println(newItem.getDescription() + "," + newItem.getName() + "," + newItem.getId() + ", " + newItem.getUserId() + "," + newItem.getQuantity());
        System.out.println("before saved: " + newItem);
        newItem.setUserId(userId);
        Item savedItem = itemRepository.save(newItem);
        System.out.println("after saved: " + savedItem);
//        Item item = itemRepository.findById(id).orElseThrow(() -> new RuntimeException("MyNewItemModal not found"));
//        item.setName(updatedItem.getName());
//        item.setDescription(updatedItem.getDescription());
//        item.setQuantity(updatedItem.getQuantity());
        return savedItem;
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        System.out.println("An item has been successfully deleted: " + id);
        itemRepository.deleteById(id);
    }
}