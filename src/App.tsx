import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { LoginSignUp, Profile } from "./pages";
import { useState } from "react";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#58a6ff",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: "url('/background.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        },
      },
    },
  },
});

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        {!isUserLoggedIn ? (
          <LoginSignUp setLogin={setIsUserLoggedIn} />
        ) : (
          <Profile />
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;
