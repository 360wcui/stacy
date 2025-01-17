// Item Controller
package com.ussf.dingo.controller;

import com.ussf.dingo.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.ussf.dingo.model.Item;

@RestController
@RequestMapping("/api/items")
public class ItemController {
    @Autowired
    private ItemRepository itemRepository;

    @PostMapping
    public Item createItem(@RequestBody Item item) {
        return itemRepository.save(item);
    }

    @GetMapping("/user/{userId}")
    public List<Item> getUserItems(@PathVariable Long userId) {
        return itemRepository.findByUserId(userId);
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

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        itemRepository.deleteById(id);
    }
}