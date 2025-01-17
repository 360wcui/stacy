// Item Repository
package com.ussf.dingo.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ussf.dingo.model.Item;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByUserId(Long userId);
}