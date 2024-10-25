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
    void getPlayerById_returnsPlayer_ifPresent() {
        Player testPlayer = new Player("01", "test_player", "pw", 1234L, List.of());
        when(mockRepo.findById(testPlayer.id()))
                .thenReturn(Optional.of(testPlayer));

        assertEquals(testPlayer.id(), playerService.getPlayerById(testPlayer.id()).id());
        verify(mockRepo).findById(testPlayer.id());
    }

    @Test
    void getPlayerById_throwsException_ifNotPresent() {
        assertThrows(NoSuchElementException.class, () -> playerService.getPlayerById("01"));
    }

    @Test
    void getScoreById_returnsCorrectScore() {
        Player testPlayer = new Player("01", "test_user", "pw", 1234L, List.of());
        when(mockRepo.findById(testPlayer.id()))
                .thenReturn(Optional.of(testPlayer));
        assertEquals(Long.parseLong("1234"), playerService.getScoreById(testPlayer.id()));
        verify(mockRepo).findById(testPlayer.id());
    }

    @Test
    void updateScoreById_returnsUpdatedScore() {
        Player testPlayer = new Player("01", "test_user", "pw", 1234L, List.of());
        String updatedScore = "5678";
        when(mockRepo.findById(testPlayer.id()))
                .thenReturn(Optional.of(testPlayer));
        when(mockRepo.save(testPlayer.withScore(Long.parseLong(updatedScore))))
                .thenReturn(testPlayer.withScore(Long.parseLong(updatedScore)));
        assertEquals(testPlayer.withScore(Long.parseLong(updatedScore)), playerService.updateScoreById(testPlayer.id(), updatedScore));
        verify(mockRepo).findById(testPlayer.id());
        verify(mockRepo).save(testPlayer.withScore(Long.parseLong(updatedScore)));
    }

    @Test
    void createPlayer_returnsCorrectPlayer() {
        PlayerDTO newPlayerDTO = new PlayerDTO("test-player", "test-pw");
        Player newPlayer = new Player("01", newPlayerDTO.username(), newPlayerDTO.password(), 0L, List.of());
        when(mockRepo.save(any()))
                .thenReturn(newPlayer);
        Player createdPlayer = playerService.createPlayer(newPlayerDTO);
        assertEquals(newPlayer.username(), createdPlayer.username());
        assertEquals(newPlayer.password(), createdPlayer.password());
    }
}