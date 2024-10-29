import {GameBody} from "../GameBody.tsx";
import {Alert, Button, Stack, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export type Puzzle = {
    puzzleId: string,
    title: string,
    body: string,
    solution: string
}

export function GamePage() {
    const [loading, setLoading] = useState(true);
    const [puzzleNumber, setPuzzleNumber] = useState<number>(1)
    const [solved, isSolved] = useState<boolean>(false)
    const navigate = useNavigate();
    const [puzzles, setPuzzles] = useState<Puzzle[]>([])

    const getPuzzles = async () => {
        try {
            const response = await axios.get('/api/puzzles');
            setPuzzles(response.data);
        } catch (error) {
            console.error('Error fetching puzzles:', error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getPuzzles()
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return <>
        {puzzleNumber === 1 && <Typography variant={"h4"}>Welcome to the room.</Typography>}

        <Typography variant={"h2"}>This is puzzle #{puzzleNumber}.</Typography>

        <GameBody puzzle={puzzles[puzzleNumber - 1]}/>
        <Stack>
            <TextField placeholder={"Enter your answer here."}></TextField>
            <Button variant={"contained"} onClick={() => isSolved(true)}>Solve</Button>
            {solved && <Alert severity="success">Correct! The answer was "{puzzles[puzzleNumber - 1].solution}". You can
                continue.</Alert>}
            <Button disabled={!solved} onClick={() => {
                setPuzzleNumber(puzzleNumber + 1)
                isSolved(false)
                if (puzzleNumber === 3) {
                    navigate('/home', {state: {roomDone: true}})
                }
            }}>Next</Button>
        </Stack>
    </>
}