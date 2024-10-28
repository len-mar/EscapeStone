import {InputForm} from "../InputForm.tsx";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export function LoginPage(props){
    const navigate = useNavigate();

    return <>
        <p>Welcome! To continue, please log in.</p>
        <InputForm signUpPage={props.signUpPage} isSignUpPage={props.isSignUpPage}/>
        <Button onClick={() => navigate('/signup')}>No account yet? Sign Up</Button>
    </>
}