package com.example.simplecrud.service;

import com.example.simplecrud.model.Item;
import com.example.simplecrud.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;

    public Page<Item> findAll(String search, Pageable pageable) {
        if (search != null && !search.isBlank())
            return itemRepository.findByNameContainingIgnoreCase(search.trim(), pageable);
        return itemRepository.findAll(pageable);
    }

    public Optional<Item> findById(Long id) {
        return itemRepository.findById(id);
    }

    public Item save(Item item) {
        return itemRepository.save(item);
    }

    public void deleteById(Long id) {
        itemRepository.deleteById(id);
    }
}
