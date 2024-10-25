package org.example.backend.puzzle;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import java.util.List;
import java.util.Optional;

class PuzzleServiceTest {

    PuzzleRepo mockPuzzleRepo = Mockito.mock(PuzzleRepo.class);
    PuzzleService puzzleService = new PuzzleService(mockPuzzleRepo);

    @Test
    void getRandomPuzzles() {
        Puzzle expectedPuzzle = new Puzzle("01", "test", "i am a test puzzle", "tset");
        Mockito.when(mockPuzzleRepo.findByPuzzleId(ArgumentMatchers.any())).thenReturn(Optional.of(expectedPuzzle));
        Assertions.assertEquals(puzzleService.getRandomPuzzles(), List.of(expectedPuzzle, expectedPuzzle, expectedPuzzle));
        Mockito.verify(mockPuzzleRepo, Mockito.times(3)).findByPuzzleId(ArgumentMatchers.any());
    }
}