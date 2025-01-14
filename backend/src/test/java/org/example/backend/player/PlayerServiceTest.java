package org.example.backend.player;

import org.junit.jupiter.api.Test;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PlayerServiceTest {
    PlayerRepo mockRepo = mock(PlayerRepo.class);
    PlayerService playerService = new PlayerService(mockRepo);

    @Test
    void getAllPlayers_returnsCorrectPlayerList() {
        List<Player> playerList = List.of(new Player("01", "test_player", "pw", 1234L, new ArrayList<>()));
        when(mockRepo.findAll())
                .thenReturn(playerList);

        assertEquals(playerList, playerService.getAllPlayers());

        verify(mockRepo).findAll();
    }
    @Test
    void getAllPlayers_returnsEmptyList_whenNoPlayersInRepo() {
        when(mockRepo.findAll()).thenReturn(List.of());

        assertEquals(List.of(), playerService.getAllPlayers());
        verify(mockRepo).findAll();
    }

    @Test
    void getPlayerById_returnsPlayer_ifPresent() {
        Player testPlayer = new Player("01", "test_player", "pw", 1234L, new ArrayList<>());
        when(mockRepo.findById(testPlayer.getId()))
                .thenReturn(Optional.of(testPlayer));

        assertEquals(testPlayer.getId(), playerService.getPlayerById(testPlayer.getId()).getId());
        verify(mockRepo).findById(testPlayer.getId());
    }

    @Test
    void getPlayerById_throwsException_ifNotPresent() {
        assertThrows(NoSuchElementException.class, () -> playerService.getPlayerById("01"));
    }

    @Test
    void getScoreById_returnsCorrectScore() {
        Player testPlayer = new Player("01", "test_user", "pw", 1234L, new ArrayList<>());
        when(mockRepo.findById(testPlayer.getId()))
                .thenReturn(Optional.of(testPlayer));
        assertEquals(Long.parseLong("1234"), playerService.getScoreById(testPlayer.getId()));
        verify(mockRepo).findById(testPlayer.getId());
    }

    @Test
    void updateScoreById_returnsUpdatedPlayer() {
        Player testPlayer = new Player("01", "test_user", "pw", 1234L, new ArrayList<>());
        StringRequestBody updatedScore = new StringRequestBody("5678");
        when(mockRepo.findById(testPlayer.getId()))
                .thenReturn(Optional.of(testPlayer));
        testPlayer.setScore(Long.parseLong(updatedScore.getField()));
        when(mockRepo.save(testPlayer)).thenReturn(testPlayer);
        assertEquals(testPlayer, playerService.updateScoreById(testPlayer.getId(), updatedScore));
        verify(mockRepo).findById(testPlayer.getId());
        verify(mockRepo).save(testPlayer);
    }

    @Test
    void updateSolvedPuzzlesById_returnsUpdatedPlayer() {
        // creates test player with one solved puzzle
        ArrayList<String> solvedPuzzles = new ArrayList<>(Arrays.asList("test-puzzle"));
        Player testPlayer = new Player("01", "test_user", "pw", 1234L, solvedPuzzles);
        // creates newly solved puzzle and adds it to the list
        StringRequestBody newSolvedPuzzle = new StringRequestBody("test-puzzle2");
        solvedPuzzles.add(newSolvedPuzzle.getField());
        // updates the player's solved puzzles
        testPlayer.setSolvedPuzzles(solvedPuzzles);

        when(mockRepo.findById(testPlayer.getId()))
                .thenReturn(Optional.of(testPlayer));
        when(mockRepo.save(testPlayer)).thenReturn(testPlayer);
        assertEquals(testPlayer, playerService.updateSolvedPuzzlesById(testPlayer.getId(), newSolvedPuzzle));
        verify(mockRepo).findById(testPlayer.getId());
        verify(mockRepo).save(testPlayer);
    }

    @Test
    void deleteProgress_deletesProgress() {
        Player testPlayer = new Player("01", "test_user", "pw", 1234L, new ArrayList<>(Arrays.asList("test-puzzle")));
        Player emptyPlayer = new Player("01", "test_user", "pw", 0L, new ArrayList<>());
        when(mockRepo.findById(testPlayer.getId()))
                .thenReturn(Optional.of(testPlayer));
        when(mockRepo.save(emptyPlayer)).thenReturn(emptyPlayer);
        assertEquals(emptyPlayer, playerService.deleteProgress(testPlayer.getId()));
    }
}