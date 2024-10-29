import {InputForm} from "../InputForm.tsx";
import {Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

type Props = {
    signUpPage:boolean,
    isSignUpPage:(signUpPage:boolean) => void
}
// TODO: implement login to endpoint
export function LoginPage(props:Props){
    props.isSignUpPage(false)
    const navigate = useNavigate();

    return <>
        <Typography variant={"h2"}>Welcome.</Typography>
        <Typography variant={"h4"}>To continue, please log in.</Typography>
        <InputForm signUpPage={props.signUpPage}/>
        <Button variant={"outlined"} onClick={() => navigate('/signup')}>No account yet? Sign Up</Button>
    </>
}