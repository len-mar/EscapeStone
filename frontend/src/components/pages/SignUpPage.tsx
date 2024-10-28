import {InputForm} from "../InputForm.tsx";

type Props = {
    signUpPage:boolean,
    isSignUpPage:(signUpPage:boolean) => void
}

export function SignUpPage(props:Props) {
    props.isSignUpPage(true)
    return <>
        <h1>Sign Up</h1>
        <InputForm signUpPage={props.signUpPage}/>
    </>
}