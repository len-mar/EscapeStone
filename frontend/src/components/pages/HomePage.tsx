import {Button, Typography} from "@mui/material";


export function HomePage() {

    return <>

        <Typography variant={"h4"}>Start a new game ...</Typography>

            <Button variant={"contained"} href="/game">New Game</Button>
        <Typography variant={"h4"}>...or continue where you left off.</Typography>

        <Button variant={"outlined"}>Continue</Button>

    </>
}