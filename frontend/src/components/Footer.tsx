import {AppBar, Box, Button, Toolbar} from "@mui/material";

export function Footer(){
    return (
        <AppBar position="static" sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <Toolbar>
                <Box>
                    <Button color="inherit" href="/imprint">Imprint</Button>
                    <Button color="inherit" href="/contact">Contact</Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}