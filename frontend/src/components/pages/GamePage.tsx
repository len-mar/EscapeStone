import {Alert, Button, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Puzzle} from "../../App.tsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";

// TODO: format more nicely


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
            const response: Puzzle[] = await fetch("api/puzzles/random/" + playerId).then(r => {
                if (!r.ok) {
                    throw new Error("error: " + r.status)
                }
                return r.json()
            })
            setPuzzles(response)

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

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setGuess(e.target.value)
    }

    useEffect(() => {
        getPuzzles()
    }, []);

    if (loading) {
        return <Typography variant={"h3"}>Loading...</Typography>;
    }

    return <>
        {puzzleNumber === 1 &&
            <Typography variant={"h5"}>Welcome to the room. This is puzzle #{puzzleNumber}.</Typography>}

        <Typography variant={"h3"}> {puzzles[puzzleNumber - 1].body}</Typography>
        <TextField onChange={handleChange} onKeyDown={(e) => {
            if (e.key === "Enter") {
                handleGuess()
            }
        }} value={guess} placeholder={"Enter your answer here."}></TextField>
        <Button disabled={solved === "true"} variant={"contained"} onClick={handleGuess}>Solve</Button>
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
    </>
}