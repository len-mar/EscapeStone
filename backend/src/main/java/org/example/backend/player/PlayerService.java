package org.example.backend.player;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PlayerService {

    private final PlayerRepo playerRepo;

    public List<Player> getAllPlayers(){
        return playerRepo.findAll();
    }

    Player getPlayerById(String id){
        return playerRepo.findById(id).orElseThrow();
    }

    Player createPlayer(PlayerDTO newPlayerDTO){
    return playerRepo.save(new Player(UUID.randomUUID().toString(), newPlayerDTO.username(), newPlayerDTO.email(), newPlayerDTO.password(), 0L, List.of()));
    }

    Long getScoreById(String id){
        return playerRepo.findById(id).orElseThrow().getScore();
    }

    Player updateScoreById(String id, String score){
        Player player = playerRepo.findById(id).orElseThrow();
        player.setScore(Long.parseLong(score));
        return playerRepo.save(player);
    }

}
