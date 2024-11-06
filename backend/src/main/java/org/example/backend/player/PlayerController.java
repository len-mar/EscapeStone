package org.example.backend.player;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/players")
@RequiredArgsConstructor
public class PlayerController {

    private final PlayerService playerService;
// TODO: check put/push/delete endpoints for correct user accessing

    // FIXME: anonymousUser handling to no longer throw errors
    // when there's no cookie context, no user authenticated, it throws a 500
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
    Player updateScoreById(@PathVariable String id, @RequestBody StringRequestBody score) {
        return playerService.updateScoreById(id, score);
    }

    @PutMapping("/{id}/solved")
    Player updateSolvedPuzzlesById(@PathVariable String id, @RequestBody StringRequestBody solvedPuzzle) {
        return playerService.updateSolvedPuzzlesById(id, solvedPuzzle);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Player> deleteProgress(@PathVariable String id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Player targetPlayer = playerService.getPlayerById(id);
        Player currentPlayer = (Player) authentication.getPrincipal();
        if(!currentPlayer.getUsername().equals(targetPlayer.getUsername())){
            throw new AuthenticationException("Unauthorized"){};
        }
        return ResponseEntity.ok(playerService.deleteProgress(id));
    }
}
