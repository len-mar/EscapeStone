package org.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    User getUserById(@PathVariable String id){
        return userService.getUserById(id);
    }

    @GetMapping("/{id}/score")
    Long getScoreById(@PathVariable String id){
        return userService.getScoreById(id);
    }

    @PutMapping("/{id}/score")
    User updateScoreById(@PathVariable String id, @RequestBody Long score){
        return userService.updateScoreById(id, score);
    }


}
