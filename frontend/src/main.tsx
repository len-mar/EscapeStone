import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {CssBaseline} from "@mui/material";

const theme = createTheme({
    typography: { fontFamily: "cormorant unicase"},
    palette: {
        mode: "light",
        primary: {
            main: '#254336',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#B7B597'
        }
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <App/>
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>,
)
