import {Alert, Button, TextField} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

type Props = {
    signUpPage:boolean
}

export function InputForm(props: Props) {
    const [usernameInput, setUsernameInput] = useState<string>("")
    const [passwordInput, setPasswordInput] = useState<string>("")
    const [uniqueUsername, setUniqueUsername] = useState<string>("new")
    const [loginFailed, setLoginFailed] = useState<string>("new")
    const navigate = useNavigate()

    const handleSignup = async () => {
        try {
            const checkResponse = await fetch(`/api/players/check/` + usernameInput);
            const isUnique = await checkResponse.json();
            if (!isUnique) {
                console.log('Username not unique')
                setUniqueUsername("false")
                return;
            }

            setUniqueUsername("true")
            const signupResponse = await fetch('/auth/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username: usernameInput, password: passwordInput}),
            });

            const signupData = await signupResponse.json()
            navigate("/login")
            console.log('User signed up successfully:', signupData)
        } catch (error) {
            console.error('Error during signup process:', error)
        }

    };

    const handleLogin = async () => {
        try {
            const loginResponse = await fetch('/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username: usernameInput, password: passwordInput}),
            });

            const loginData = await loginResponse.json();
            if(loginData.status === 401){
                setLoginFailed("true")
                return
            }
            setLoginFailed("false")
            console.log('User logged in successfully:', loginData);
            navigate("/home")
        } catch (error) {
            console.error('Error during login process:', error);
        }
    }


    return (
        <>
            {(uniqueUsername === "false" && props.signUpPage) && <Alert severity="error">Username already taken. Please choose another.</Alert>}
            {loginFailed === "true" && <Alert severity="error">Incorrect username or password.</Alert>}

            <TextField id="username" label="Username" variant="outlined" value={usernameInput}
                       onChange={(e) => setUsernameInput(e.target.value)}/>

            <TextField id="password" label="Password" variant="outlined" type={"password"} value={passwordInput}
                       onChange={(e) => setPasswordInput(e.target.value)}/>
            {props.signUpPage ? <Button variant={"contained"} onClick={handleSignup}>Sign Up</Button> :
                <Button variant={"contained"} onClick={handleLogin}>Login</Button>}
        </>
    )
}