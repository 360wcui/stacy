package com.ussf.dingo.controller;

import com.ussf.dingo.model.Item;
import com.ussf.dingo.repository.ItemRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
@WebMvcTest(ItemController.class)
class ItemControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ItemRepository itemRepository;

    private Item item1;
    private Item item2;

    @BeforeEach
    void setUp() {
        item1 = new Item(1L, "Item1", "Description1", 10);
        item2 = new Item(2L, "Item2", "Description2", 5);
    }

    @Test
    @WithMockUser(username = "user", roles = "USER")
    void testGetItemById() throws Exception {
        Mockito.when(itemRepository.findById(1L)).thenReturn(Optional.of(item1));

        mockMvc.perform(get("http://localhost:8080/api/item/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(item1.getId()))
                .andExpect(jsonPath("$.name").value(item1.getName()));
    }

//    @Test
//    @WithMockUser(username = "user", roles = "USER")
//    void testCreateItem() throws Exception {
//        Mockito.when(itemRepository.save(any(Item.class))).thenReturn(item1);
//
//        mockMvc.perform(post("http://localhost:8080/api/item")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content("{\"name\":\"Item1\",\"description\":\"Description1\",\"quantity\":10}"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.id").value(item1.getId()))
//                .andExpect(jsonPath("$.name").value(item1.getName()))
//                .andExpect(jsonPath("$.description").value(item1.getDescription()))
//                .andExpect(jsonPath("$.quantity").value(item1.getQuantity()));
//    }

    @Test
    @WithMockUser(username = "user", roles = "USER")
    void testGetUserItems() throws Exception {
        Mockito.when(itemRepository.findByUserId(1L)).thenReturn(Arrays.asList(item1, item2));

        mockMvc.perform(get("http://localhost:8080/api/item/user/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(item1.getId()))
                .andExpect(jsonPath("$[1].id").value(item2.getId()));
    }

    @Test
    @WithMockUser(username = "user", roles = "USER")
    void testGetAllItems() throws Exception {
        Mockito.when(itemRepository.findAll()).thenReturn(Arrays.asList(item1, item2));

        mockMvc.perform(get("http://localhost:8080/api/item"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(item1.getId()))
                .andExpect(jsonPath("$[1].id").value(item2.getId()));
    }



//    @Test
//    @WithMockUser(username = "user", roles = "USER")
//    void testUpdateItem() throws Exception {
//        Mockito.when(itemRepository.findById(1L)).thenReturn(Optional.of(item1));
//        Mockito.when(itemRepository.save(any(Item.class))).thenReturn(item1);
//
//        mockMvc.perform(put("http://localhost:8080/api/item/1")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content("{\"name\":\"UpdatedName\",\"description\":\"UpdatedDescription\",\"quantity\":20}"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.name").value("UpdatedName"))
//                .andExpect(jsonPath("$.description").value("UpdatedDescription"))
//                .andExpect(jsonPath("$.quantity").value(20));
//    }

//    @Test
//    @WithMockUser(username = "user", roles = "USER")
//    void testDeleteItem() throws Exception {
//        Mockito.doNothing().when(itemRepository).deleteById(1L);
//
//        mockMvc.perform(delete("http://localhost:8080/api/item/1"))
//                .andExpect(status().isOk());
//    }
}