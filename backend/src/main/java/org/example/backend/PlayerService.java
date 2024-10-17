package org.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PlayerService {

    private final PlayerRepo playerRepo;

    Player getPlayerById(String id){
        return playerRepo.findById(id).orElseThrow();
    }

    Player createPlayer(PlayerDTO newPlayerDTO){
    return playerRepo.save(new Player(UUID.randomUUID().toString(), newPlayerDTO.username(), newPlayerDTO.password(), Long.parseLong("0")));
    }

    Long getScoreById(String id){
        return playerRepo.findById(id).orElseThrow().score();
    }

    Player updateScoreById(String id, Long score){
        Player player = playerRepo.findById(id).orElseThrow();
        return playerRepo.save(player.withScore(score));
    }

}
