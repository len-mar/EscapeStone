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
        <p>Welcome! To continue, please log in.</p>
        <InputForm signUpPage={props.signUpPage}/>
        <Button onClick={() => navigate('/signup')}>No account yet? Sign Up</Button>
    </>
}