import {GameBody} from "../GameBody.tsx";
import {Alert, Button, Stack, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
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
    const [solved, isSolved] = useState<string>("empty")
    const navigate = useNavigate();
    const [puzzles, setPuzzles] = useState<Puzzle[]>([])
    const [guess, setGuess] = useState<string>("")

    const getPuzzles = async () => {
        try {
            const playerId: string = await axios.get('/api/players/me').then(r => r.data.id);
            const response = await axios.get('/api/puzzles/random/' + playerId);
            setPuzzles(response.data);
        } catch (error) {
            console.error('Error fetching puzzles:', error);
        } finally {
            setLoading(false)
        }
    };

    const handleGuess = async () => {
        if (guess.toLowerCase() === puzzles[puzzleNumber - 1].solution.toLowerCase()) {
            const id: string = await axios.get('/api/players/me').then(r => r.data.id);
            const puzzleResponse = await axios.put('/api/players/' + id + "/solved", {
                field: puzzles[puzzleNumber - 1].puzzleId
            });
            console.log(puzzleResponse)
            const scoreResponse = await axios.put('/api/players/' + id + "/score", {field: "1000"});
            console.log(scoreResponse)
            isSolved("true")
            return
        }
        isSolved("false")
    }

    function handleChange(e:React.ChangeEvent<HTMLInputElement>): void {
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
            {solved === "true" ?
                <Alert severity="success">Correct! The answer was "{puzzles[puzzleNumber - 1].solution}". You can
                    continue.</Alert> : solved === "false" &&
                <Alert severity="error">Incorrect. Please try again.</Alert>}
            <Button onClick={() => {
                setPuzzleNumber(puzzleNumber + 1)
                isSolved("empty")
                setGuess("")
                if (puzzleNumber === 3) {
                    navigate('/home', {state: {roomDone: true}})
                }
            }}>{solved === "true" ? "Next" : "Skip"}</Button>
        </Stack>
    </>
}