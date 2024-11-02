import {Avatar, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {Puzzle} from "./GamePage.tsx";

// TODO: format more nicely
export function ProfilePage() {
    const [username, setUsername] = useState<string>("")
    const [score, setScore] = useState<number>()
    const [solvedPuzzleIds, setSolvedPuzzleIds] = useState<string[]>([])
    const [solvedPuzzles, setSolvedPuzzles] = useState<Puzzle[]>([])

    const getPuzzleDetails = async () => {
        const tempData:Puzzle[] = []
        for (let i = 0; i < solvedPuzzleIds.length; i++) {
            const puzzleResponse = await fetch('/api/puzzles/' + solvedPuzzleIds[i])
            const puzzleData = await puzzleResponse.json()
            tempData.push(puzzleData)
        }
        setSolvedPuzzles(tempData)
    }
    const loadProfile = async () => {
        try {
            const userResponse = await fetch("api/players/me")
            const userData = await userResponse.json()
            setUsername(userData.username)
            setScore(userData.score)
            setSolvedPuzzleIds(userData.solvedPuzzles)
        } catch (error) {
            console.error('Error during profile fetching:', error);
        }
    }
    useEffect(() => {
        loadProfile()
    }, [])

    useEffect(() => {
        getPuzzleDetails()
    }, [solvedPuzzleIds])

    return <>
        <Typography variant={"h2"}>Profile</Typography>
        <Avatar alt="your profile pic" src="/src/avatar.jpg" sx={{width: 50, height: 50}}/>

        <Typography align={"left"} variant={"h4"}>Username: {username}</Typography>
        <Typography align={"left"} variant={"h4"}>Score: {score}</Typography>
        <Typography align={"left"} variant={"h4"}>Solved Puzzles: </Typography>
        {solvedPuzzles.length > 0 ? solvedPuzzles.map(p =>
                <Typography
                    align={"left"} key={p.puzzleId} variant={"subtitle2"}>{p.puzzleId}: {p.body} Solution: {p.solution}</Typography>) :
            <Typography variant={"body2"}>No puzzles solved yet.</Typography>}
    </>
}