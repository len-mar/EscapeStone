package org.example.backend;

import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
@RequiredArgsConstructor
class PlayerControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private PlayerRepo testRepo;

    @Test
    void getPlayerById() throws Exception {
        Player testPlayer = new Player("01", "test_player", "pw", Long.parseLong("1234"));
        testRepo.save(testPlayer);
        mockMvc.perform(MockMvcRequestBuilders.get("/players/" + testPlayer.id()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        {
                          "id": "01",
                          "username": "test_player",
                          "password": "pw",
                          "score": 1234
                        }
                        """));
    }

    @Test
    void getScoreById() throws Exception {
        Player testPlayer = new Player("01", "test_player", "pw", Long.parseLong("1234"));
        testRepo.save(testPlayer);
        mockMvc.perform(MockMvcRequestBuilders.get("/players/" + testPlayer.id() + "/score"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("1234"));
    }

    // TODO: implement
    @Test
    void updateScoreById() {
    }

    // TODO: implement
    @Test
    void createPlayer() {
    }
}