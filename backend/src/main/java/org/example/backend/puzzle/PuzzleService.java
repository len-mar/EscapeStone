package org.example.backend.puzzle;

import lombok.RequiredArgsConstructor;
import org.example.backend.player.Player;
import org.example.backend.player.PlayerRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class PuzzleService {
    private final PuzzleRepo puzzleRepo;
    private final PlayerRepo playerRepo;

    // TODO: generate only puzzles they haven't solved yet
    List<Puzzle> getRandomPuzzles(String playerId) {
        Player player = playerRepo.findById(playerId).orElseThrow();
        List<Integer> digits = new ArrayList<>();
        Random r = new Random();
        while (digits.size() < 3) {
            // generates a random int from 0-59 plus one, so 1-60
            int digit = r.nextInt(60) + 1;
            if (!digits.contains(digit) && !player.getSolvedPuzzles().contains(Integer.toString(digit))) {
                digits.add(digit);
            }
        }
        return digits.stream().map(digit -> puzzleRepo.findByPuzzleId(digit.toString()).orElseThrow()).toList();
    }

    Puzzle getPuzzleById(String puzzleId) {
        return puzzleRepo.findByPuzzleId(puzzleId).orElseThrow();
    }
}
