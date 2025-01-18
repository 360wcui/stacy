// MyNewItemModal Controller
package com.ussf.dingo.controller;

import com.ussf.dingo.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.ussf.dingo.model.Item;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/item")
public class ItemController {
    @Autowired
    private ItemRepository itemRepository;

    @PostMapping
    public Item createItem(@RequestBody Item item) {
        return itemRepository.save(item);
    }

    @GetMapping("/user/{userId}")
    public List<Item> getUserItems(@PathVariable Long userId) {
        System.out.println("gets here user items");
        return itemRepository.findByUserId(userId);
    }

    @PutMapping("/user/{userId}")
    public Item saveUserItems(@PathVariable Long userId, @RequestBody Item newItem) {
        System.out.println("gets here user items");
        newItem.setUserId(userId);
        return itemRepository.save(newItem);
    }

    @GetMapping
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    @GetMapping("/{id}")
    public Item getItemById(@PathVariable Long id) {
        return itemRepository.findById(id).orElseThrow(() -> new RuntimeException("Item not found"));
    }

    @PutMapping("/{id}")
    public Item updateItem(@PathVariable Long id, @RequestBody Item updatedItem) {
        Item item = itemRepository.findById(id).orElseThrow(() -> new RuntimeException("Item not found"));
        item.setName(updatedItem.getName());
        item.setDescription(updatedItem.getDescription());
        item.setQuantity(updatedItem.getQuantity());
        return itemRepository.save(item);
    }

    @PutMapping("/add")
    public Item addItem(@RequestBody Item newItem) {
        System.out.println("gets here add item");
//        Item item = itemRepository.findById(id).orElseThrow(() -> new RuntimeException("MyNewItemModal not found"));
//        item.setName(updatedItem.getName());
//        item.setDescription(updatedItem.getDescription());
//        item.setQuantity(updatedItem.getQuantity());
        return itemRepository.save(newItem);
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        itemRepository.deleteById(id);
    }
}