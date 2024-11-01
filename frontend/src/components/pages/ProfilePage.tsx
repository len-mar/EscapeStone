import {Avatar, Typography} from "@mui/material";
import {useEffect, useState} from "react";


export function ProfilePage() {
    const [username, setUsername] = useState<string>("")
    const [score, setScore] = useState<number>()
    const [solvedPuzzles, setSolvedPuzzles] = useState<string[]>([])

    const loadProfile = async () => {
        try {
            const userResponse = await fetch("api/players/me")
            const userData = await userResponse.json()
            setUsername(userData.username)
            setScore(userData.score)
            setSolvedPuzzles(userData.solvedPuzzles)
        } catch (error) {
            console.error('Error during profile fetching:', error);
        }
    }
    useEffect(() => {
        loadProfile()
    }, [])

    return <>
        <Typography variant={"h2"}>Profile</Typography>
        <Avatar alt="your profile pic" src="/src/avatar.jpg" sx={{width: 50, height: 50}}/>

        <Typography variant={"h4"}>Username: {username}</Typography>
        <Typography variant={"h4"}>Score: {score}</Typography>
        <Typography variant={"h4"}>Puzzles solved: {solvedPuzzles.length > 0 ? solvedPuzzles.map(p => <Typography
                variant={"body1"}>{p}</Typography>) :
            <Typography variant={"body2"}>No puzzles solved yet.</Typography>}</Typography>

    </>
}