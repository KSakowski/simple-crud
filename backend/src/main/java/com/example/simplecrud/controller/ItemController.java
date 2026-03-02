package com.example.simplecrud.controller;

import com.example.simplecrud.model.Item;
import com.example.simplecrud.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @GetMapping
    public Page<Item> getAll(
            @RequestParam(defaultValue = "0")       int    page,
            @RequestParam(defaultValue = "10")      int    size,
            @RequestParam(defaultValue = "id,asc")  String sort,
            @RequestParam(defaultValue = "")        String search) {

        String[] parts = sort.split(",");
        String   field = parts[0].trim();
        String   dir   = parts.length > 1 ? parts[1].trim() : "asc";

        Set<String> ALLOWED = Set.of("id", "name", "description");
        if (!ALLOWED.contains(field)) field = "id";

        Sort sortObj = "desc".equalsIgnoreCase(dir)
                ? Sort.by(field).descending()
                : Sort.by(field).ascending();

        return itemService.findAll(search, PageRequest.of(page, size, sortObj));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getById(@PathVariable Long id) {
        return itemService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Item create(@RequestBody Item item) {
        return itemService.save(item);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> update(@PathVariable Long id, @RequestBody Item item) {
        return itemService.findById(id)
                .map(existing -> {
                    item.setId(id);
                    return ResponseEntity.ok(itemService.save(item));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return itemService.findById(id)
                .map(item -> {
                    itemService.deleteById(id);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
