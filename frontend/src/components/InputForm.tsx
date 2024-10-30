import {Button, TextField} from "@mui/material";
import {useState} from "react";
import axios from "axios";

type Props = {
    signUpPage: boolean
}

export function InputForm(props: Props) {
    const [usernameInput, setUsernameInput] = useState<string>("")
    const [passwordInput, setPasswordInput] = useState<string>("")
    const [emailInput, setEmailInput] = useState<string>("")


    function handleSignup():void {
        axios.post("/auth/signup", {username: usernameInput, email: emailInput, password: passwordInput})
            .catch(error => console.error(error));
    }
    function handleLogin():void {
        axios.post("/auth/login", {email: emailInput, password: passwordInput})
            .catch(error => console.error(error));
    }

    return (
        <>
            {props.signUpPage && <TextField id="username" label="Username" variant="outlined" value={usernameInput}
                                           onChange={(e) => setUsernameInput(e.target.value)}/>}

            <TextField id="email" label="Email" variant="outlined" value={emailInput}
                       onChange={(e) => setEmailInput(e.target.value)}/>
            <TextField id="password" label="Password" variant="outlined" value={passwordInput}
                       onChange={(e) => setPasswordInput(e.target.value)}/>

            {props.signUpPage ? <Button variant={"contained"} onClick={handleSignup}>Sign Up</Button> :
                <Button variant={"contained"} onClick={handleLogin}>Login</Button>}
        </>
    )
}