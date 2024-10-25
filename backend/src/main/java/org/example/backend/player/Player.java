package org.example.backend.player;

import lombok.With;
import org.example.backend.puzzle.Puzzle;

import java.util.List;

// FIXME: with hash function
public record Player(String id, String username, String password, @With Long score, @With List<Puzzle> completedPuzzles) {
}
