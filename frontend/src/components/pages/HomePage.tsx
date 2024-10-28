import {Alert, Button, Typography} from "@mui/material";
import { useLocation } from 'react-router-dom';


export function HomePage() {
    const location = useLocation();
    const { roomDone } = location.state || {};

    return <>
    {roomDone && <Alert severity="success">Great job! You've solved the room.</Alert>}
        <Typography variant={"h4"}>Start a new game ...</Typography>

            <Button variant={"contained"} href="/game">New Game</Button>
        <Typography variant={"h4"}>...or continue where you left off.</Typography>

        <Button variant={"outlined"}>Continue</Button>
    </>
}