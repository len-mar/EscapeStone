import {InputForm} from "../InputForm.tsx";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

type Props = {
    signUpPage:boolean,
    isSignUpPage:(signUpPage:boolean) => void
}

export function LoginPage(props:Props){
    props.isSignUpPage(false)
    const navigate = useNavigate();

    return <>
        <h1>Welcome!</h1>
        <h2>To continue, please log in.</h2>

        <InputForm signUpPage={props.signUpPage}/>
        <Button onClick={() => navigate('/signup')}>No account yet? Sign Up</Button>
    </>
}