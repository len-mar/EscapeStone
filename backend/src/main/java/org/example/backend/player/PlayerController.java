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

    // FIXME: anonymousUser handling to no longer throw errors
    @GetMapping("/me")
    public ResponseEntity<Player> authenticatedPlayer() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(authentication);
        Player currentPlayer = (Player) authentication.getPrincipal();
        return ResponseEntity.ok(currentPlayer);
    }

    @GetMapping
    public ResponseEntity<List<Player>> getAllPlayers() {
        List <Player> players = playerService.getAllPlayers();
        return ResponseEntity.ok(players);
    }

    @GetMapping("/check/{username}")
    public boolean isUniqueUsername(@PathVariable String username){
        List <String> usernames = playerService.getAllPlayers().stream().map(Player::getUsername).toList();
        return !usernames.contains(username);
    }

    @GetMapping("/{id}")
    Player getPlayerById(@PathVariable String id) {
        return playerService.getPlayerById(id);
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
