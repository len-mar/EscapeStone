package org.example.backend.player;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    Long getScoreById(String id){
        return playerRepo.findById(id).orElseThrow().getScore();
    }

    Player updateScoreById(String id, StringRequestBody score){
        Player player = playerRepo.findById(id).orElseThrow();
        Long updatedScore = player.getScore() + Long.parseLong(score.getField());
        player.setScore(updatedScore);
        return playerRepo.save(player);
    }

    public Player updateSolvedPuzzlesById(String id, StringRequestBody newSolvedPuzzle) {
        Player player = playerRepo.findById(id).orElseThrow();
        ArrayList<String> solvedPuzzles = player.getSolvedPuzzles();
        solvedPuzzles.add(newSolvedPuzzle.getField());
        player.setSolvedPuzzles(solvedPuzzles);
        return playerRepo.save(player);
    }

    public Player deleteProgress(String id){
        Player player = playerRepo.findById(id).orElseThrow();
        player.setScore(0L);
        player.setSolvedPuzzles(new ArrayList<>());
        return playerRepo.save(player);
    }
}
