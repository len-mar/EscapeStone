import {Button, Stack, TextField} from "@mui/material";
import {useState} from "react";
import axios from "axios";

    export function InputForm(props){
        const [usernameInput, setUsernameInput] = useState<string>("")
        const [passwordInput, setPasswordInput] = useState<string>("")

        function handleSubmit():void {
            axios.post("api/login?username=" + usernameInput + "&password=" + passwordInput).catch(error => console.error(error));
        }
        return(
        <>
            <Stack>
                <TextField id="username" label="Username" variant="outlined" value={usernameInput} onChange={(e)=> setUsernameInput(e.target.value)}/>
                <TextField id="password" label="Password" variant="outlined" value={passwordInput} onChange={(e)=> setPasswordInput(e.target.value)}/>
                {props.signUpPage ? <Button onClick={handleSubmit}>SignUp</Button> : <Button onClick={handleSubmit}>Login</Button>}
            </Stack>
        </>
    )
}