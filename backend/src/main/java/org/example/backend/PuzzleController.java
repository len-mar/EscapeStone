package org.example.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/puzzles")
public class PuzzleController {

    @GetMapping
    List<Puzzle> getRandomPuzzles(){
        // todo: generate random three digit number
        // todo: check that user hasn't completed either of the three yet
        // return list of puzzles
        return List.of(new Puzzle("01", "test puzz", "this is a test puzzle."));
    }
}
