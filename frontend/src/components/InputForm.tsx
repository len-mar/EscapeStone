import {Button, TextField} from "@mui/material";
import {useState} from "react";

type Props = {
    signUpPage:boolean
}
// TODO: user feedback when logging in with incorrect credentials
// TODO: obscure password

    export function InputForm(props:Props){
        const [usernameInput, setUsernameInput] = useState<string>("")
        const [passwordInput, setPasswordInput] = useState<string>("")

        /*
        function handleSubmit():void {
            axios.post("api/login?username=" + usernameInput + "&password=" + passwordInput).catch(error => console.error(error));
        }
        */

        return(
        <>
                <TextField id="username" label="Username" variant="outlined" value={usernameInput} onChange={(e)=> setUsernameInput(e.target.value)}/>
                <TextField id="password" label="Password" variant="outlined" value={passwordInput} onChange={(e)=> setPasswordInput(e.target.value)}/>
                {props.signUpPage ? <Button variant={"contained"}>Sign Up</Button> : <Button variant={"contained"}>Login</Button>}
        </>
    )
}