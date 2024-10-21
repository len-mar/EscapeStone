import {Button, Stack, TextField} from "@mui/material";

export function InputForm(){
    return(
        <>
            <Stack>
                <TextField id="outlined-basic" label="Username" variant="outlined" />
                <TextField id="outlined-basic" label="Password" variant="outlined" />
                <Button>Login</Button>


            </Stack>
            <Button>Sign Up</Button>


        </>
    )
}