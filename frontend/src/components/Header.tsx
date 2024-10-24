import {AppBar, Box, Button, Toolbar} from "@mui/material";

export function Header(){
    return (
        <AppBar position="static">
            <Toolbar>
                <Box>
                    <Button color="inherit" href="/scores">scores</Button>
                    <Button color="inherit" href="/profile">profile</Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}