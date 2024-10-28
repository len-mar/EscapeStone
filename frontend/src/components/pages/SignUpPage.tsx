import {InputForm} from "../InputForm.tsx";

export function SignUpPage(props) {
    props.isSignUpPage(true)
    return <>
        <h1>Sign Up</h1>
        <InputForm signUpPage={props.signUpPage} isSignUpPage={props.isSignUpPage}/>

    </>
}