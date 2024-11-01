import {Alert, Button, Typography} from "@mui/material";
import { useLocation } from 'react-router-dom';


export function HomePage() {
    const location = useLocation();
    const { roomDone } = location.state || {};

    return <>
    {roomDone && <Alert severity="success">Great job! You've solved the room.</Alert>}
        <Typography variant={"h4"}>Let's go!</Typography>
            <Button size={"large"} variant={"contained"} href="/game">New Game</Button>
    </>
}