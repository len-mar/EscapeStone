import {Header} from "../Header.tsx";
import {Footer} from "../Footer.tsx";
import {GameBody} from "../GameBody.tsx";

export function GamePage() {
    return <>
        <Header/>
        <p>game page</p>
        <GameBody/>
        <Footer/>
        </>
}