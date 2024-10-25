package org.example.backend.puzzle;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PuzzleRepo extends MongoRepository<Puzzle, String> {
    Optional<Puzzle> findByPuzzleId(String puzzleId);
}
