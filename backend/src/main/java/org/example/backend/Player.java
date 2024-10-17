package org.example.backend;

import lombok.With;

// FIXME: with hash function
public record Player(String id, String username, String password, @With Long score) {
}
