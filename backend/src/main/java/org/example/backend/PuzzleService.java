package org.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PuzzleService {
    private final PuzzleRepo puzzleRepo;

    List<Puzzle> getRandomPuzzles() {
        // FIXME: generate three out of 60, not 3 out of 1ß
        List<String> digits = new ArrayList<>();
        for (int i = 1; i < 10; i++) digits.add(String.valueOf(i));
        Collections.shuffle(digits);
        digits = digits.subList(0,3);
        return digits.stream().map((digit) -> puzzleRepo.findByPuzzleId(digit).orElseThrow()).toList();
        // todo: check that user hasn't completed either of the three yet (via id)
    }
    // todo: tests
}
