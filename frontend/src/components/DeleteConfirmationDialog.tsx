import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography} from '@mui/material';
import axios from "axios";

type Props = {
    deleteDialogOpen: boolean,
    isDeleteDialogOpen: (deleteDialogOpen: boolean) => void,
    id: string,
}

export function DeleteConfirmationDialog(props: Props) {

    const handleConfirm = async () => {
        axios.delete("api/players/" + props.id).catch(error => console.error(error))
        props.isDeleteDialogOpen(false)
    };

    const handleClose = async () => {
        props.isDeleteDialogOpen(false)
    }

    return (
        <Dialog open={props.deleteDialogOpen}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <Typography>Are you sure you want to delete your progress? This can't be undone.</Typography>
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
