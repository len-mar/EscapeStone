import {GameBody} from "../GameBody.tsx";
import {Alert, Button, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export function GamePage() {
    const [puzzleNumber, setPuzzleNumber] = useState<number>(1)
    const [solved, isSolved] = useState<boolean>(false)
    const navigate = useNavigate();

    return <>
        <Typography variant={"h4"}>Welcome to the room.</Typography>
        <Typography variant={"h2"}>This is puzzle #{puzzleNumber}.</Typography>

        <GameBody/>
        <Stack>
            <TextField placeholder={"Enter your answer here."}></TextField>
            <Button variant={"contained"} onClick={() => isSolved(true)}>Solve</Button>
            {solved && <Alert severity="success">Correct! You can continue.</Alert>}
            <Button disabled={!solved} onClick={() => {
                setPuzzleNumber(puzzleNumber + 1)
                isSolved(false)
                if (puzzleNumber === 3) {
                    navigate('/home', {state : {roomDone : true}})
                }
            }}>Next</Button>
        </Stack>
    </>
}