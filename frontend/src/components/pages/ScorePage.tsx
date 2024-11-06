import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {useEffect, useState} from "react";

export function ScorePage() {

    type Player = {
        username: string,
        score: number
    }

    const [data, setData] = useState<Player[]>([])

    const getData = async () => {
        const tempArray: Player[] = []
        const playerResponse = await fetch("/api/players")
        const playerData = await playerResponse.json()
        for (const player of playerData) {
            tempArray.push(player)
        }
        setData(tempArray.sort((a, b) => b.score - a.score))
    }

    useEffect(() => {
        getData()
    }, [])

    return <>
        <Typography variant={"h2"}>🏆 Scoreboard 🏆</Typography>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{fontWeight: "bold"}}>
                            Player
                        </TableCell>
                        <TableCell sx={{fontWeight: "bold"}}>
                            Score
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(entry => <TableRow>
                        <TableCell key={entry.username}>{entry.username}</TableCell>
                        <TableCell key={entry.score}>{entry.score}</TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>

        </TableContainer>
    </>
}