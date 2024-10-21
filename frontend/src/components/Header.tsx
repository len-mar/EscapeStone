import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";

export function Header(){
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    EscapeStone
                </Typography>

                <Box>
                    <Button color="inherit" href="#home">Home</Button>
                    <Button color="inherit" href="#about">About</Button>
                    <Button color="inherit" href="#contact">Contact</Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}