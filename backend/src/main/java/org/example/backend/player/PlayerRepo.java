package org.example.backend.player;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlayerRepo extends MongoRepository<Player, String> {
    Optional<Player> findByEmail(String email);
}
