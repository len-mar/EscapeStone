package org.example.backend.player;

import org.junit.jupiter.api.Test;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PlayerServiceTest {
    PlayerRepo mockRepo = mock(PlayerRepo.class);
    PlayerService playerService = new PlayerService(mockRepo);

    @Test
    void getAllPlayers_returnsCorrectPlayerList() {
        List<Player> playerList = List.of(new Player("01", "test_player", "pw", 1234L, List.of()));
        when(mockRepo.findAll())
                .thenReturn(playerList);

        assertEquals(playerList, playerService.getAllPlayers());
        verify(mockRepo).findAll();
    }
    @Test
    void getAllPlayers_returnsEmptyList_whenNoPlayersInRepo() {
        when(mockRepo.findAll())
                .thenReturn(List.of());

        assertEquals(List.of(), playerService.getAllPlayers());
        verify(mockRepo).findAll();
    }

    @Test
    void getPlayerById_returnsPlayer_ifPresent() {
        Player testPlayer = new Player("01", "test_player", "pw", 1234L, List.of());
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
        Player testPlayer = new Player("01", "test_user", "pw", 1234L, List.of());
        when(mockRepo.findById(testPlayer.getId()))
                .thenReturn(Optional.of(testPlayer));
        assertEquals(Long.parseLong("1234"), playerService.getScoreById(testPlayer.getId()));
        verify(mockRepo).findById(testPlayer.getId());
    }

    @Test
    void updateScoreById_returnsUpdatedScore() {
        Player testPlayer = new Player("01", "test_user", "pw", 1234L, List.of());
        String updatedScore = "5678";
        when(mockRepo.findById(testPlayer.getId()))
                .thenReturn(Optional.of(testPlayer));
        testPlayer.setScore(Long.parseLong(updatedScore));
        when(mockRepo.save(testPlayer)).thenReturn(testPlayer);
        assertEquals(testPlayer, playerService.updateScoreById(testPlayer.getId(), updatedScore));
        verify(mockRepo).findById(testPlayer.getId());
        verify(mockRepo).save(testPlayer);
    }
}