import {GameBody} from "../GameBody.tsx";
import {Button, Stack, TextField} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export function GamePage() {
    const [puzzleNumber, setPuzzleNumber] = useState<number>(1)
    const [solved, isSolved] = useState<boolean>(false)
    const navigate = useNavigate();

    return <>
        <h1>Welcome to the room.</h1>
        <h2>This is puzzle #{puzzleNumber}.</h2>
        <GameBody/>
        <Stack>
            <TextField placeholder={"Enter your answer here."}></TextField>
            <Button variant={"contained"} onClick={() => isSolved(true)}>Solve</Button>
            <Button disabled={!solved} onClick={() => {
                setPuzzleNumber(puzzleNumber + 1)
                isSolved(false)
                if(puzzleNumber === 3) navigate('/home')}}>Next</Button>
        </Stack>

    </>
}