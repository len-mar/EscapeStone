import {Header} from "../Header.tsx";
import {Footer} from "../Footer.tsx";
import {Button, Paper} from "@mui/material";

export function HomePage() {
    return <>
        <Paper>
            <Header/>
            <p>home page</p>
            <Button color="inherit" href="/game">new game</Button>
            <Footer/>
        </Paper>
    </>
}