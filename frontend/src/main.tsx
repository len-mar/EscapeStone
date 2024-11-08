import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {CssBaseline} from "@mui/material";

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: "20px"
                }
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    fontSize: "15px"
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    margin: "10px"
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    fontSize: "20px"
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-input': {
                        fontSize: "20px",
                        color: "#3a5a40"
                    }
                }
            }
        }
    },
    typography: {fontFamily: "cinzel decorative"},
    palette: {
        mode: "light",
        primary: {
            main: '#254336',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#739072'
        }
    },
});

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <App/>
        </ThemeProvider>
    </BrowserRouter>
)
