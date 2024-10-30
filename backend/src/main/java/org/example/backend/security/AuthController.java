package org.example.backend.security;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
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
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginPlayerDTO loginPlayerDTO, HttpServletResponse response) {
        Player authenticatedPlayer = authenticationService.authenticate(loginPlayerDTO);

        String jwtToken = jwtService.generateToken(authenticatedPlayer);

        LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime());
        Cookie cookie = new Cookie("token", jwtToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        response.addCookie(cookie);
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response){
        Cookie cookie = new Cookie("token", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);

        response.addCookie(cookie);
        return ResponseEntity.ok("Logged out successfully.");
    }
}
