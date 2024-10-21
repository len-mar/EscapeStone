import {AppBar, Box, Button, Toolbar} from "@mui/material";

export function Footer(){
    return (
        <AppBar position="static">
            <Toolbar>
                <Box>
                    <Button color="inherit" href="#home">Imprint</Button>
                    <Button color="inherit" href="#contact">Contact</Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}