package org.example.backend.puzzle;

import org.example.backend.player.PlayerRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import java.util.List;
import java.util.Optional;

class PuzzleServiceTest {

    PuzzleRepo mockPuzzleRepo = Mockito.mock(PuzzleRepo.class);
    PlayerRepo mockPlayerRepo = Mockito.mock(PlayerRepo.class);

    PuzzleService puzzleService = new PuzzleService(mockPuzzleRepo, mockPlayerRepo);

    @Test
    void getRandomPuzzles() {
        Puzzle expectedPuzzle = new Puzzle("01", "test", "i am a test puzzle", "tset");
        Mockito.when(mockPuzzleRepo.findByPuzzleId(ArgumentMatchers.any())).thenReturn(Optional.of(expectedPuzzle));
        Assertions.assertEquals(puzzleService.getRandomPuzzles("01"), List.of(expectedPuzzle, expectedPuzzle, expectedPuzzle));
        Mockito.verify(mockPuzzleRepo, Mockito.times(3)).findByPuzzleId(ArgumentMatchers.any());
    }
}