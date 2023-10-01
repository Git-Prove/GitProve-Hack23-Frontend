import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginSignUp, Profile } from "./pages";
import { useState } from "react";
import { Skill } from "./pages/Skill";

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
        <Router>
          {!isUserLoggedIn ? (
            <LoginSignUp setLogin={setIsUserLoggedIn} />
          ) : (
            <Routes>
              <Route path="/skill/:skillName" element={<Skill />} />
              <Route path="/" element={<Profile />} />
            </Routes>
          )}
        </Router>
      </Container>
    </ThemeProvider>
  );
};

export default App;
