import {Typography} from "@mui/material";
import {Puzzle} from "./pages/GamePage.tsx";

type Props = {
    puzzle:Puzzle
}

export function GameBody(props:Props) {
    return <>
        <Typography variant={"body1"}> {props.puzzle.body}
        </Typography>
    </>
}