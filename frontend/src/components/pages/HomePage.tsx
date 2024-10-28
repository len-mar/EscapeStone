import {Button, Stack, Typography} from "@mui/material";


export function HomePage() {

    return <>

        <Typography variant={"h2"}>Home</Typography>

        <Stack>
            <Button variant={"outlined"} href="/game">New Game</Button>
            <Button variant={"contained"}>Continue</Button>
        </Stack>

        <Typography variant={"h4"}>Start a new game or continue where you left off.</Typography>



    </>
}