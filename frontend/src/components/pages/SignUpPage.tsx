import {InputForm} from "../InputForm.tsx";
import {Typography} from "@mui/material";

type Props = {
    signUpPage:boolean,
    isSignUpPage:(signUpPage:boolean) => void
}

// TODO: implement signup to endpoint
export function SignUpPage(props:Props) {
    props.isSignUpPage(true)
    return <>
        <Typography variant={"h2"}>Sign Up</Typography>
        <InputForm signUpPage={props.signUpPage}/>
    </>
}