package org.example.backend;

import lombok.With;

// FIXME: with hash function
public record User(String id, String username, String password, @With Long score) {
}
