import {Button, Stack, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";

    export function InputForm(){
        const navigate = useNavigate();

        return(
        <>
            <Stack>
                <TextField id="outlined-basic" label="Username" variant="outlined" />
                <TextField id="outlined-basic" label="Password" variant="outlined" />
                <Button>Login</Button>
            </Stack>
                <Button onClick={() => navigate('/signup')}>Sign Up</Button>
        </>
    )
}