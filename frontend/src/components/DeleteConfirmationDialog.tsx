import {Dialog, DialogContent, DialogActions, Button, Typography} from '@mui/material';
import axios from "axios";

type Props = {
    deleteDialogOpen: boolean,
    isDeleteDialogOpen: (deleteDialogOpen: boolean) => void,
    id: string,
    setScore:(score:number)=>void,
    setSolvedPuzzleIds:(solvedPuzzleIds:string[])=>void
}

export function DeleteConfirmationDialog(props: Props) {

    const handleConfirm = async () => {
        axios.delete("api/players/" + props.id)
            .then(response => {
                props.setScore(response.data.score)
                props.setSolvedPuzzleIds(response.data.solvedPuzzles)
            })
            .then(() => props.isDeleteDialogOpen(false))
            .catch(error => console.error(error))
    };

    const handleClose = async () => {
        props.isDeleteDialogOpen(false)
    }

    return (
        <Dialog open={props.deleteDialogOpen}>
            <DialogContent>
                <Typography variant={"h5"}>Are you sure you want to delete your progress? This can't be undone.</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    No, close.
                </Button>
                <Button onClick={handleConfirm} color="error">
                    Yes, delete.
                </Button>
            </DialogActions>
        </Dialog>
    );
}
