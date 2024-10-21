package org.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PuzzleService {
    private final PuzzleRepo puzzleRepo;

    List<Puzzle> getRandomPuzzles() {
        List<Integer> digits = new ArrayList<>();
        while(digits.size() < 3) {
            int digit = 1 + (int)(Math.random()* 59);
            if(!digits.contains(digit)){
                digits.add(digit);
            }
        }
        return digits.stream().map((digit) -> puzzleRepo.findByPuzzleId(digit.toString()).orElseThrow()).toList();
    }
}
