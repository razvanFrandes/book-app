import { blueGrey } from "@mui/material/colors";
import { createTheme, Theme } from "@mui/material/styles";

// Create a custom theme by extending the default theme
const customTheme: Theme = createTheme({
  typography: {
    fontFamily: ["Oxygen", "sans-serif"].join(","),
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#2fff8b",
    },
    background: {
      default: "#121212",
      paper: "#121212",
    },
  },

  // Create a button variant

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#2b2b2b transparent",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "transparent",
            minHeight: 24,
            border: "3px solid #2b2b2b",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: "transparent",
            },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "100px",
          boxShadow: "none",
          textTransform: "none",
          fontWeight: 700,
          ":hover": {
            // I want when hover to add opaicty tu bg primary color
            boxShadow: "none",
            opacity: 0.8,
          },
        },
        outlined: {
          color: "#fff",
          borderColor: "#fff",
          px: 0,
          border: "none",
          ":hover": {
            borderColor: "#4fff84",
            color: "#4fff84",
            border: "none",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          color: "#000",
          boxShadow: "none",
          borderBottom: "1px solid #f0f0f0",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#000000",
          border: "none",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          border: "none",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 900,
          height: "60px",
          transition: "0.2s",
          "&.Mui-selected": {
            color: "#4fff84",
          },
          "&:hover": {
            backgroundColor: "rgb(255 255 255 / 10%)",
          },
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#171717",
          border: "1px solid #4fff84",
          backgroundImage: "none",
          color: "#fff",
        },
        container: {
          backdropFilter: "blur(10px)",
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            color: "#fff",
          },
          "& .MuiInputLabel-root": {
            color: "#b6b6b6",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#404040",
            },
            "&:hover fieldset": {
              borderColor: "#4fff84",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#4fff84",
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#4fff84",
          "&.Mui-focused ": {
            color: "#4fff84",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#fff",
          borderColor: "#4fff84",
          "&:hover": {
            borderColor: "#4fff84",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4fff84 !important",
          },
          ":hover": {
            borderColor: "#4fff84",
          },
        },
      },
    },
  },
});

// Export the custom theme
export default customTheme;
