package org.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepo;

    User getUserById(String id){
        return userRepo.findById(id).orElseThrow();
    }

    Long getScoreById(String id){
        return getUserById(id).score();
    }

    User updateScoreById(String id, Long score){
        User user = userRepo.findById(id).orElseThrow();
        return userRepo.save(user.withScore(score));
    }

}
