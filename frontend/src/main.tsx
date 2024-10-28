import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#004e3a',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default:'#dc004e'
        }
    },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <ThemeProvider theme={theme}>
          <App />
          </ThemeProvider>
      </BrowserRouter>
  </StrictMode>,
)
