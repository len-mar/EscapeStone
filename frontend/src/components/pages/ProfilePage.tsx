import {Avatar} from "@mui/material";

export function ProfilePage() {
    return <>
        <h1>Profile</h1>
        <h2>Max Mustermann</h2>
        <Avatar alt="your profile pic" src="/src/avatar.jpg" sx={{width: 50, height: 50}}/>
        <p>Puzzles solved:</p>
        <p>Rooms solved:</p>
    </>
}