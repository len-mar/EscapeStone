import {Button, Stack} from "@mui/material";


export function HomePage() {

    return <>
        <h1>Home</h1>
        <h2>Start a new game or continue where you left off.</h2>

        <Stack>
            <Button variant={"outlined"} href="/game">New Game</Button>
            <Button variant={"contained"}>Continue</Button>
        </Stack>


    </>
}