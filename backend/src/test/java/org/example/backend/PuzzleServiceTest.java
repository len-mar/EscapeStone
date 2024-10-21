package org.example.backend;

import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class PuzzleServiceTest {

    PuzzleRepo mockPuzzleRepo = mock(PuzzleRepo.class);
    PuzzleService puzzleService = new PuzzleService(mockPuzzleRepo);

    @Test
    void getRandomPuzzles() {
        Puzzle expectedPuzzle = new Puzzle("01", "test", "i am a test puzzle", "tset");
        when(mockPuzzleRepo.findByPuzzleId(any())).thenReturn(Optional.of(expectedPuzzle));
        assertEquals(puzzleService.getRandomPuzzles(), List.of(expectedPuzzle, expectedPuzzle, expectedPuzzle));
        verify(mockPuzzleRepo, times(3)).findByPuzzleId(any());
    }
}