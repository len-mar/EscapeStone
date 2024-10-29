package org.example.backend.player;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/players")
@RequiredArgsConstructor
public class PlayerController {

    private final PlayerService playerService;

    @GetMapping("/me")
    public ResponseEntity<Player> authenticatedPlayer() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Player currentPlayer = (Player) authentication.getPrincipal();
        return ResponseEntity.ok(currentPlayer);
    }

    @GetMapping
    public ResponseEntity<List<Player>> getAllPlayers() {
        List <Player> players = playerService.getAllPlayers();
        return ResponseEntity.ok(players);
    }

    @GetMapping("/{id}")
    Player getPlayerById(@PathVariable String id) {
        return playerService.getPlayerById(id);
    }

    @PostMapping("/new")
    Player createPlayer(@RequestBody PlayerDTO newPlayerDTO){
        return playerService.createPlayer(newPlayerDTO);
    }
    @GetMapping("/{id}" + "/score")
    Long getScoreById(@PathVariable String id) {
        return playerService.getScoreById(id);
    }

    @PutMapping("/{id}/score")
    Player updateScoreById(@PathVariable String id, @RequestBody String score) {
        return playerService.updateScoreById(id, score);
    }


}
