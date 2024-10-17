package org.example.backend;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    @GetMapping("/{id}")
    User getUserById(@PathVariable String id){
        // TODO: get actual user
        return new User("01", "test_user", "pw", Long.parseLong("1234"));
    }

    @GetMapping("/{id}/score")
    Long getScoreById(@PathVariable String id){
        // TODO: get actual score
        return Long.parseLong("1234");
    }

    @PutMapping("/{id}/score")
    User updateScoreById(@PathVariable String id){
        // TODO: update actual score
        return new User("01", "test_user", "pw", Long.parseLong("1234"));
    }


}
