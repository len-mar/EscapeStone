package org.example.backend.player;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/players")
@RequiredArgsConstructor
public class PlayerController {

    private final PlayerService playerService;

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
