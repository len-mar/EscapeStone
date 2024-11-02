package org.example.backend.puzzle;

import org.example.backend.player.Player;
import org.example.backend.player.PlayerRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.times;

class PuzzleServiceTest {

    PuzzleRepo mockPuzzleRepo = Mockito.mock(PuzzleRepo.class);
    PlayerRepo mockPlayerRepo = Mockito.mock(PlayerRepo.class);

    PuzzleService puzzleService = new PuzzleService(mockPuzzleRepo, mockPlayerRepo);

    @Test
    void getRandomPuzzles() {
        // create expected puzzle object and test player
        Puzzle expectedPuzzle = new Puzzle("01", "test", "i am a test puzzle", "tset");
        Player testPlayer = new Player("01", "test username", "test password", 0L, new ArrayList<>());
        // tell mockito that the puzzle repo has three entries
        Mockito.when(mockPuzzleRepo.count()).thenReturn(3L);
        // tell mockito to return the player and the puzzle when queried by their respective ids
        Mockito.when(mockPlayerRepo.findById(testPlayer.getId())).thenReturn(Optional.of(testPlayer));
        Mockito.when(mockPuzzleRepo.findByPuzzleId(ArgumentMatchers.any())).thenReturn(Optional.of(expectedPuzzle));

        // assert that when the service method is called with the player id, a list of the puzzle is returned
        Assertions.assertEquals(List.of(expectedPuzzle, expectedPuzzle, expectedPuzzle), puzzleService.getRandomPuzzles(testPlayer.getId()));
        Mockito.verify(mockPuzzleRepo, times(3)).findByPuzzleId(ArgumentMatchers.any());
    }
}