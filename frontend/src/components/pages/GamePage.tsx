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

// TODO: game logic with scores
export function GamePage() {
    const [loading, setLoading] = useState(true);
    const [puzzleNumber, setPuzzleNumber] = useState<number>(1)
    const [solved, isSolved] = useState<boolean>(false)
    const navigate = useNavigate();
    const [puzzles, setPuzzles] = useState<Puzzle[]>([])
    const [guess, setGuess] = useState<string>("")

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

    function handleGuess(e): void {
        if (guess.toLowerCase() === puzzles[puzzleNumber - 1].solution.toLowerCase()) {
            isSolved(true)
            return
        }
        isSolved(false)
    }

    function handleChange(e): void {
        setGuess(e.target.value)
    }

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
            <TextField onChange={handleChange} value={guess} placeholder={"Enter your answer here."}></TextField>
            <Button variant={"contained"} onClick={handleGuess}>Solve</Button>
            {solved ? <Alert severity="success">Correct! The answer was "{puzzles[puzzleNumber - 1].solution}". You can
                continue.</Alert> : <Alert severity="error">Incorrect. Please try again.</Alert>}
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