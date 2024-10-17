package org.example.backend;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface PuzzleRepo extends MongoRepository<Puzzle, String> {
}
