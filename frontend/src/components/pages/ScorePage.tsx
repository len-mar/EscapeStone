import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {useEffect, useState} from "react";

export function ScorePage() {

    type ScoreboardPlayer = {
        username: string,
        score: number
    }

    const [data, setData] = useState<ScoreboardPlayer[]>([])
    const [loading, setLoading] = useState<boolean>(true);


    const getData = async () => {
        try {
            const tempArray: ScoreboardPlayer[] = []
            const playerResponse = await fetch("/api/players")
            const playerData = await playerResponse.json()
            for (const player of playerData) {
                tempArray.push(player)
            }
            setData(tempArray.sort((a, b) => b.score - a.score))
        } catch (error) {
            console.error('Error during score fetching:', error);

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    if (loading) {
        return <Typography variant={"h3"}>Loading...</Typography>;
    }

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
                    {data.map((entry, index) => <TableRow key={index + entry.username}>
                        <TableCell key={entry.username}>{entry.username}</TableCell>
                        <TableCell key={index}>{entry.score}</TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>

        </TableContainer>
    </>
}