import './App.css'
import {Route, Routes} from "react-router-dom";
import {SignUpPage} from "./components/pages/SignUpPage.tsx";
import {LandingPage} from "./components/pages/LandingPage.tsx";
import {HomePage} from "./components/pages/HomePage.tsx";
import {GamePage} from "./components/pages/GamePage.tsx";
import {ImprintPage} from "./components/pages/ImprintPage.tsx";
import {ContactPage} from "./components/pages/ContactPage.tsx";
import {ProfilePage} from "./components/pages/ProfilePage.tsx";
import {ScorePage} from "./components/pages/ScorePage.tsx";



function App() {

    return (
        <>
            <Routes>
                <Route path={"/"} element={<LandingPage/>}></Route>
                <Route path={"/signup"} element={<SignUpPage/>}></Route>
                <Route path={"/home"} element={<HomePage/>}></Route>
                <Route path={"/game"} element={<GamePage/>}></Route>
                <Route path={"/imprint"} element={<ImprintPage/>}></Route>
                <Route path={"/contact"} element={<ContactPage/>}></Route>
                <Route path={"/profile"} element={<ProfilePage/>}></Route>
                <Route path={"/scores"} element={<ScorePage/>}></Route>


            </Routes>
        </>
    )
}

export default App
