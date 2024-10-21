package org.example.backend;

import lombok.With;

import java.util.List;

// FIXME: with hash function
public record Player(String id, String username, String password, @With Long score, @With List<Puzzle> completedPuzzles) {
}
