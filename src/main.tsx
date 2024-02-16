import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";

import App from "./App";
import AuthProvider from "./context/AuthContext";
import { getTheme } from "./lib/theme/theme";
import { QueryProvider } from "./lib/react-query/QueryProvider";

import "react-toastify/dist/ReactToastify.css";

export const theme = createTheme(getTheme());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  </BrowserRouter>
);
