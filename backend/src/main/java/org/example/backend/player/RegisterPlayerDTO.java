package org.example.backend.player;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class RegisterPlayerDTO {
    private String username, password;
}
