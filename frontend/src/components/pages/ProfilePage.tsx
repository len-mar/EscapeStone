import {Avatar, Typography} from "@mui/material";

export function ProfilePage() {
    return <>
        <Typography variant={"h2"}>Profile</Typography>
        <Typography variant={"h4"}>Max Mustermann</Typography>

        <Avatar alt="your profile pic" src="/src/avatar.jpg" sx={{width: 50, height: 50}}/>

        <Typography variant={"body1"}>Puzzles solved:</Typography>
        <Typography variant={"body1"}>Rooms solved:</Typography>
    </>
}