import {Avatar, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";


export function ProfilePage() {
    const [username, setUsername] = useState<string>("")
    const [score, setScore] = useState<number>()
    const [solvedPuzzleIds, setSolvedPuzzleIds] = useState<string[]>([])
    const [solvedPuzzleTitles, setSolvedPuzzleTitles] = useState<string[]>([])



    // todo: get puzzles by id
    const loadProfile = async () => {
        try {
            // const id: string = await axios.get('/api/players/me').then(r => r.data.id);
            const userResponse = await fetch("api/players/me")
            const userData = await userResponse.json()

            setUsername(userData.username)
            setScore(userData.score)
            setSolvedPuzzleIds(userData.solvedPuzzleIds)

            // FIXME: make me work
            solvedPuzzleIds.forEach(puzzleId => axios.get('/api/puzzles/' + puzzleId)
                .then(r => setSolvedPuzzleTitles(solvedPuzzleTitles.concat(r.data.title))))

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
        <Typography variant={"h4"}>Puzzles solved: {solvedPuzzleTitles.length > 0 ? solvedPuzzleTitles.map(p => <Typography
                variant={"body1"}>{p}</Typography>) :
            <Typography variant={"body2"}>No puzzles solved yet.</Typography>}</Typography>

    </>
}