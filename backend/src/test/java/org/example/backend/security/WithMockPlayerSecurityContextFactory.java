package org.example.backend.security;

import org.example.backend.player.Player;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

import java.util.List;

public class WithMockPlayerSecurityContextFactory implements WithSecurityContextFactory<WithMockPlayer> {

    @Override
    public SecurityContext createSecurityContext(WithMockPlayer annotation) {
        SecurityContext context = SecurityContextHolder.createEmptyContext();

        Player mockPlayer = new Player();
        mockPlayer.setUsername(annotation.username());
        mockPlayer.setId(annotation.id());

        Authentication auth = new UsernamePasswordAuthenticationToken(mockPlayer, null, List.of());
        context.setAuthentication(auth);

        return context;
    }
}

