import * as React from "react";
import { ThemeProvider, Button } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import customTheme from "./theme/themeOptions";
import AppShell from "./components/AppShell/AppShell";
export default function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <AppShell />
    </ThemeProvider>
  );
}
