package org.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PuzzleService {
    private final PuzzleRepo puzzleRepo;

    List<Puzzle> getRandomPuzzles(){
        // todo: generate random three digit number
        // todo: check that user hasn't completed either of the three yet
        // return list of puzzles
        return List.of(new Puzzle("01", "test puzz", "this is a test puzzle."));
    }
}
