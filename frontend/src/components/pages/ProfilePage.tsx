import {Accordion, AccordionDetails, AccordionSummary, Avatar, Button, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {Puzzle} from "./GamePage.tsx";
import {DeleteConfirmationDialog} from "../DeleteConfirmationDialog.tsx";

// TODO: format more nicely
export function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [score, setScore] = useState<number>()
    const [solvedPuzzleIds, setSolvedPuzzleIds] = useState<string[]>([])
    const [solvedPuzzles, setSolvedPuzzles] = useState<Puzzle[]>([])
    const [deleteDialogOpen, isDeleteDialogOpen] = useState<boolean>(false);

    const getPuzzleDetails = async () => {
        const tempData: Puzzle[] = []
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
            setUserId(userData.id)
            setUsername(userData.username)
            setScore(userData.score)
            setSolvedPuzzleIds(userData.solvedPuzzles)
        } catch (error) {
            console.error('Error during profile fetching:', error);
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        isDeleteDialogOpen(true)
    }

    useEffect(() => {
        loadProfile()
    }, [])

    useEffect(() => {
        getPuzzleDetails()
    }, [solvedPuzzleIds])

    if (loading) {
        return <Typography variant={"h3"}>Loading...</Typography>;
    }

    return <>
        {deleteDialogOpen &&
            <DeleteConfirmationDialog deleteDialogOpen={deleteDialogOpen} isDeleteDialogOpen={isDeleteDialogOpen}
                                      id={userId} setScore={setScore} setSolvedPuzzleIds={setSolvedPuzzleIds}/>}
        <Typography variant={"h2"}>Profile</Typography>
        <Avatar alt="your profile pic" src="/src/avatar.png" sx={{width: 100, height: 100}}/>

        <Typography align={"left"} variant={"h4"}>Username: {username}</Typography>
        <Typography align={"left"} variant={"h4"}>Score: {score}</Typography>
        <Typography align={"left"} variant={"h4"}>Solved Puzzles: </Typography>
        <Accordion>
            <AccordionSummary>Click to expand.</AccordionSummary>
            <AccordionDetails>
                {solvedPuzzles.length > 0 ? solvedPuzzles.map(p =>
                        <Typography
                            align={"left"} key={p.puzzleId} variant={"body1"}>{p.solution}:{p.body}</Typography>) :
                    <Typography variant={"body2"}>No puzzles solved yet.</Typography>}
            </AccordionDetails>

        </Accordion>

        <Button color={"error"} onClick={handleDelete}>Delete Progress</Button>

    </>
}