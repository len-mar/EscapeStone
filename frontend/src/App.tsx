import {Route, Routes} from "react-router-dom";
import {SignUpPage} from "./components/pages/SignUpPage.tsx";
import {HomePage} from "./components/pages/HomePage.tsx";
import {GamePage} from "./components/pages/GamePage.tsx";
import {ImprintPage} from "./components/pages/ImprintPage.tsx";
import {ContactPage} from "./components/pages/ContactPage.tsx";
import {ProfilePage} from "./components/pages/ProfilePage.tsx";
import ProtectedRoutes from "./components/ProtectedRoutes.tsx";
import {LoginPage} from "./components/pages/LoginPage.tsx";
import {useState} from "react";
import {Box, Container} from "@mui/material";
import {Header} from "./components/Header.tsx";
import {Footer} from "./components/Footer.tsx";
import {ScorePage} from "./components/pages/ScorePage.tsx";


function App() {
    const [signUpPage, isSignUpPage] = useState<boolean>(false);

    return (
        <>
            <Header/>
            <Container fixed sx={{height: '500px', width: '600px', overflow: 'hidden', backgroundColor: "#B2C8BA", borderRadius: "5%", margin: "50px", backgroundImage:"url('src/pattern.jpg')"}}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', overflowY: 'scroll', height: '100%'}}>
                    <Routes>
                        <Route path={"/"} element={<HomePage/>}/>
                        <Route path={"/login"}
                               element={<LoginPage signUpPage={signUpPage} isSignUpPage={isSignUpPage}/>}/>
                        <Route path={"/signup"}
                               element={<SignUpPage signUpPage={signUpPage} isSignUpPage={isSignUpPage}/>}/>
                        <Route element={<ProtectedRoutes/>}>
                            <Route path={"/home"} element={<HomePage/>}/>
                            <Route path={"/scores"} element={<ScorePage/>}/>
                            <Route path={"/game"} element={<GamePage/>}/>
                            <Route path={"/profile"} element={<ProfilePage/>}/>
                        </Route>
                        <Route path={"/imprint"} element={<ImprintPage/>}/>
                        <Route path={"/contact"} element={<ContactPage/>}/>
                    </Routes>
                </Box>
            </Container>
            <Footer/>
        </>

    )
}

export default App
