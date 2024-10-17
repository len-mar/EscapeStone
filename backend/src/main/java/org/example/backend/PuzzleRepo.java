package org.example.backend;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PuzzleRepo extends MongoRepository<Puzzle, String> {
}
