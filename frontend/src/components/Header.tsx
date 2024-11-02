import {AppBar, Box, Button, Toolbar} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export function Header(){
const navigate = useNavigate()

    function handleLogout() {
        axios.post("/auth/logout").catch(error => console.error(error))
        navigate("/login")
    }

    return (
        <AppBar position="static" sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <Toolbar>
                <Box>
                    <Button color="inherit" href="/home">Game</Button>
                    <Button color="inherit" href="/scores">Scores</Button>
                    <Button color="inherit" href="/profile">Profile</Button>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}