package org.example.backend.player;

import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc
@RequiredArgsConstructor
class PlayerControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private PlayerRepo testRepo;

    @WithMockUser
    @Test
    void getAllPlayers() throws Exception {
        Player testPlayer = new Player("01", "test_player", "pw", 1234L, List.of());
        testRepo.save(testPlayer);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/players"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        [
                        {
                          "id": "01",
                          "username": "test_player",
                          "password": "pw",
                          "score": 1234,
                          "solvedPuzzles": []
                        }
                        ]
                        """));
    }

    @WithMockUser
    @Test
    void getAllPlayers_returnsEmptyList() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/players"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        []
                        """));
    }

    @WithMockUser
    @Test
    void getPlayerById() throws Exception {
        Player testPlayer = new Player("01", "test_player", "pw", 1234L, List.of());
        testRepo.save(testPlayer);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/players/" + testPlayer.getId()))
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

    @WithMockUser
    @Test
    void getScoreById() throws Exception {
        Player testPlayer = new Player("01", "test_player", "pw", 1234L, List.of());
        testRepo.save(testPlayer);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/players/" + testPlayer.getId() + "/score"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("1234"));
    }

    @WithMockUser
    @Test
    void updateScoreById() throws Exception {
        Player testPlayer = new Player("01", "test_player", "pw", 1234L, List.of());
        testRepo.save(testPlayer);
        mockMvc.perform(MockMvcRequestBuilders.put("/api/players/" + testPlayer.getId() + "/score")
                        .content("5678"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                                                {
                                                  "id": "01",
                                                  "username": "test_player",
                                                  "password": "pw",
                                                  "score": 5678
                                                }
                        """));
    }

    @WithMockUser
    @Test
    void isUniqueUsername_returnsTrue_ifUnique() throws Exception {
        Player existingPlayer = new Player("01", "test", "pw", 1234L, List.of());
        testRepo.save(existingPlayer);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/players/check/unique-username"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("true"));
    }

    @WithMockUser
    @Test
    void isUniqueUsername_returnsFalse_ifNotUnique() throws Exception {
        Player existingPlayer = new Player("01", "test", "pw", 1234L, List.of());
        testRepo.save(existingPlayer);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/players/check/test"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("false"));
    }


//    @WithMockUser
//    @Test
//    void authenticatedPlayer() throws Exception {
//        Player existingPlayer = new Player("01", "test", "pw", 1234L, List.of());
//        testRepo.save(existingPlayer);
//        mockMvc.perform(MockMvcRequestBuilders.get("/api/players/me"))
//                .andExpect(MockMvcResultMatchers.status().isOk());
//    }
}