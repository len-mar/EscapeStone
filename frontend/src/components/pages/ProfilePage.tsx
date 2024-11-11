import {Accordion, AccordionDetails, AccordionSummary, Avatar, Button, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {Puzzle, Player} from "../../App.tsx";
import {DeleteConfirmationDialog} from "../DeleteConfirmationDialog.tsx";

export function ProfilePage() {
    const [loading, setLoading] = useState<boolean>(true);
    const [playerData, setPlayerData] = useState<Player | undefined>()
    const [solvedPuzzleTexts, setSolvedPuzzleTexts] = useState<Puzzle[]>([])
    const [deleteDialogOpen, isDeleteDialogOpen] = useState<boolean>(false);

    const loadProfile = async () => {
        try {
            const playerResponse = await fetch("api/players/me")
            const data = await playerResponse.json()
            setPlayerData(data)
        } catch (error) {
            console.error('Error during profile fetching:', error);
        } finally {
            setLoading(false)
        }
    }

    const getPuzzleDetails = async () => {
        const tempData: Puzzle[] = []
        for (let i = 0; i < playerData.solvedPuzzles.length; i++) {
            const puzzleResponse = await fetch('/api/puzzles/' + playerData.solvedPuzzles[i])
            const puzzleData = await puzzleResponse.json()
            tempData.push(puzzleData)
        }
        setSolvedPuzzleTexts(tempData)
    }

    const handleDelete = async () => {
        isDeleteDialogOpen(true)
    }

    useEffect(() => {
        loadProfile()
    }, [])


    useEffect(() => {
        if (playerData) {
            getPuzzleDetails()
        }
    }, [playerData])

    if (!loading) {
        return <>
            {deleteDialogOpen &&
                <DeleteConfirmationDialog deleteDialogOpen={deleteDialogOpen} isDeleteDialogOpen={isDeleteDialogOpen}
                                          playerData={playerData} setPlayerData={setPlayerData}/>}
            <Typography variant={"h2"}>Profile</Typography>
            <Avatar alt="your profile pic" src="/src/avatar.png" sx={{width: 100, height: 100}}/>

            <Typography align={"left"} variant={"h4"}>Username: {playerData?.username}</Typography>
            <Typography align={"left"} variant={"h4"}>Score: {playerData?.score}</Typography>
            <Typography align={"left"} variant={"h4"}>Solved Puzzles: </Typography>
            <Accordion>
                <AccordionSummary>Click to expand.</AccordionSummary>
                <AccordionDetails>
                    {solvedPuzzleTexts.length > 0 ? solvedPuzzleTexts.map(p =>
                            <Typography
                                align={"left"} key={p.puzzleId} variant={"body1"}>{p.solution}:{p.body}</Typography>) :
                        <Typography variant={"body2"}>No puzzles solved yet.</Typography>}
                </AccordionDetails>

            </Accordion>

            <Button color={"error"} onClick={handleDelete}>Delete Progress</Button>

        </>
    }
}