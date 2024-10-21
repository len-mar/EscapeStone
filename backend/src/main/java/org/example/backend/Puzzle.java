package org.example.backend;

import org.springframework.data.annotation.Id;

public record Puzzle(String puzzleId, String title, String body, String solution) {
}
