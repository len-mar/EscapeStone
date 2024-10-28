package org.example.backend.puzzle;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class PuzzleService {
    private final PuzzleRepo puzzleRepo;

    List<Puzzle> getRandomPuzzles() {
        List<Integer> digits = new ArrayList<>();
        Random r = new Random();
        while(digits.size() < 3) {
            // generates a random int from 0-59 plus one, so 1-60
            int digit = r.nextInt(60) + 1;
            if(!digits.contains(digit)){
                digits.add(digit);
            }
        }
        return digits.stream().map(digit -> puzzleRepo.findByPuzzleId(digit.toString()).orElseThrow()).toList();
    }
}
