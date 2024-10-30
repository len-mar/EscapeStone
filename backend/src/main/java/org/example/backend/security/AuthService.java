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
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class AuthService {
    private final PlayerRepo playerRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public Player signup(RegisterPlayerDTO input) {
        Player player = Player.builder()
                .id(UUID.randomUUID().toString())
                .username(input.getUsername())
                .password(passwordEncoder.encode(input.getPassword()))
                .score(0L)
                .solvedPuzzles(List.of())
                .build();
        return playerRepo.save(player);
    }

    public Player authenticate(LoginPlayerDTO input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getUsername(),
                        input.getPassword()
                )
        );

        return playerRepo.findByUsername(input.getUsername())
                .orElseThrow();
    }
}