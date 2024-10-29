package org.example.backend.security;

import lombok.RequiredArgsConstructor;
import org.example.backend.player.LoginPlayerDTO;
import org.example.backend.player.Player;
import org.example.backend.player.PlayerRepo;
import org.example.backend.player.RegisterPlayerDTO;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthService {
    private final PlayerRepo playerRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

// TODO: setup player to also have the score and list of solved puzzles ready
    public Player signup(RegisterPlayerDTO input) {
        Player player = new Player();
        player.setUsername(input.getUsername());
        player.setEmail(input.getEmail());
        player.setPassword(passwordEncoder.encode(input.getPassword()));

        return playerRepo.save(player);
    }

    public Player authenticate(LoginPlayerDTO input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return playerRepo.findByEmail(input.getEmail())
                .orElseThrow();
    }
}