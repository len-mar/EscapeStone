package org.example.backend.puzzle;

import lombok.RequiredArgsConstructor;
import org.example.backend.player.Player;
import org.example.backend.player.PlayerRepo;
import org.junit.jupiter.api.RepeatedTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;

@SpringBootTest
@AutoConfigureMockMvc
@RequiredArgsConstructor
class PuzzleControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private PuzzleRepo testPuzzleRepo;

    @Autowired
    private PlayerRepo testPlayerRepo;

    @RepeatedTest(50)
    @WithMockUser
    @DirtiesContext
    void getRandomPuzzles_returnsThreePuzzles() throws Exception {
        Player testPlayer = new Player("01", "test username", "test password", 0L, new ArrayList<>());
        testPlayerRepo.save(testPlayer);

        Puzzle testPuzzle1 = new Puzzle("1", "test1", "test body1", "test solution1");
        Puzzle testPuzzle2 = new Puzzle("2", "test2", "test body2", "test solution2");
        Puzzle testPuzzle3 = new Puzzle("3", "test3", "test body3", "test solution3");
        testPuzzleRepo.save(testPuzzle1);
        testPuzzleRepo.save(testPuzzle2);
        testPuzzleRepo.save(testPuzzle3);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/puzzles/random/" + testPlayer.getId()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        [{
                          "puzzleId": "1",
                          "title": "test1",
                          "body": "test body1",
                          "solution": "test solution1"
                        },
                        {
                          "puzzleId": "2",
                          "title": "test2",
                          "body": "test body2",
                          "solution": "test solution2"
                        },
                        {
                          "puzzleId": "3",
                          "title": "test3",
                          "body": "test body3",
                          "solution": "test solution3"
                        }]
                        """));

    }

    @WithMockUser
    @DirtiesContext
    @Test
    void getPuzzleById() throws Exception {
        Puzzle testPuzzle1 = new Puzzle("1", "test1", "test body1", "test solution1");
        testPuzzleRepo.save(testPuzzle1);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/puzzles/" + testPuzzle1.puzzleId()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        {
                          "puzzleId": "1",
                          "title": "test1",
                          "body": "test body1",
                          "solution": "test solution1"
                        }
                        """));

    }
}