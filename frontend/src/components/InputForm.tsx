import {Alert, Button, TextField} from "@mui/material";
import {useState} from "react";
import axios from "axios";

type Props = {
    signUpPage: boolean
}
// TODO: redirect to home from both signup and login
export function InputForm(props: Props) {
    const [usernameInput, setUsernameInput] = useState<string>("")
    const [passwordInput, setPasswordInput] = useState<string>("")
    const [uniqueUsername, setUniqueUsername] = useState<string>("new")
    const [signupSuccessful, isSignupSuccessful] = useState<boolean>(false)

    const handleSignup = async () => {
        try {
            const checkResponse = await fetch(`/api/players/check/` + usernameInput);
            const isUnique = await checkResponse.json();
            if (!isUnique) {
                console.log('Username not unique');
                setUniqueUsername("false")
                isSignupSuccessful(false)
                return;
            }

            setUniqueUsername("true")
            const signupResponse = await fetch('/auth/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username: usernameInput, password: passwordInput}),
            });

            const signupData = await signupResponse.json();
            console.log('User signed up successfully:', signupData);
            isSignupSuccessful(true)
        } catch (error) {
            console.error('Error during signup process:', error);
            isSignupSuccessful(false)
        }
    };

    function handleLogin(): void {
        axios.post("/auth/login", {username: usernameInput, password: passwordInput})
            .catch(error => console.error(error));
    }


    return (
        <>
            {(uniqueUsername === "false" && props.signUpPage) && <Alert severity="error">Username already taken. Please choose another.</Alert>}
            {signupSuccessful && <Alert severity="success">Signup successful!</Alert>}
            <TextField id="username" label="Username" variant="outlined" value={usernameInput}
                       onChange={(e) => setUsernameInput(e.target.value)}/>

            <TextField id="password" label="Password" variant="outlined" value={passwordInput}
                       onChange={(e) => setPasswordInput(e.target.value)}/>

            {props.signUpPage ? <Button variant={"contained"} onClick={handleSignup}>Sign Up</Button> :
                <Button variant={"contained"} onClick={handleLogin}>Login</Button>}
        </>
    )
}