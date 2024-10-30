package org.example.backend.security;

import lombok.RequiredArgsConstructor;
import org.example.backend.player.LoginPlayerDTO;
import org.example.backend.player.Player;
import org.example.backend.player.RegisterPlayerDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/auth")
@RestController
public class AuthController {
    private final JwtService jwtService;
    private final AuthService authenticationService;


    @PostMapping("/signup")
    public ResponseEntity<Player> register(@RequestBody RegisterPlayerDTO registerPlayerDTO) {
        Player registeredPlayer = authenticationService.signup(registerPlayerDTO);

        return ResponseEntity.ok(registeredPlayer);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginPlayerDTO loginPlayerDTO) {
        Player authenticatedPlayer = authenticationService.authenticate(loginPlayerDTO);

        String jwtToken = jwtService.generateToken(authenticatedPlayer);

        LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }
}
