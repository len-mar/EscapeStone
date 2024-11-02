import {Alert, Button, Typography} from "@mui/material";
import { useLocation } from 'react-router-dom';


export function HomePage() {
    const location = useLocation();
    const { roomDone } = location.state || {};

    return <>
    {roomDone && <Alert severity="success">Room done!</Alert>}
        <Typography variant={"h2"}>Let's go!</Typography>
        <Button size={"large"} variant={"contained"} href="/game">New Game</Button>
    </>
}