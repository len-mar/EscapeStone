
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";

export function ScorePage() {
    const dummyScores = [{player: "John", score: 1000},
        {player: "Jane", score: 4000},
        {player: "Jack", score: 5000},
        {player: "Jill", score: 200},
    ].sort((a,b) => b.score - a.score)
    return <>
        <Typography variant={"h2"}>Scoreboard</Typography>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Player
                        </TableCell>
                        <TableCell>
                            Score
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dummyScores.map(entry => <TableRow>
                        <TableCell key={entry.player}>{entry.player}</TableCell>
                        <TableCell key={entry.score}>{entry.score}</TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>

        </TableContainer>
    </>
}