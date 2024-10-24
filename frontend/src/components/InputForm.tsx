import {Button, Stack, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";

    export function InputForm(){
        const navigate = useNavigate();

        return(
        <>
            <Stack>
                <TextField id="username" label="Username" variant="outlined" />
                <TextField id="password" label="Password" variant="outlined" />
                <Button>Login</Button>
            </Stack>
                <Button onClick={() => navigate('/signup')}>Sign Up</Button>
        </>
    )
}