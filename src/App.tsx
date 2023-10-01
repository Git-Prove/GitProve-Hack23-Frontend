import {
  CircularProgress,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CodeKnowledge, LoginSignUp, Profile } from "./pages";
import { useState, useEffect } from "react";
import { Skill } from "./pages/Skill";
import { Quiz } from "./pages/Quiz";

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

export type UserData = {
  avatarUrl: string;
  name: string;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRequest = await fetch("http://127.0.0.1:3000/api/users/me", {
          credentials: "include",
        });

        const userData = await userRequest.json();

        if (!userData.error) {
          setUser(userData);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  console.log("User", user);

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
          {isLoading ? (
            <CircularProgress color="inherit" size={32} />
          ) : !user ? (
            <LoginSignUp />
          ) : (
            <Routes>
              <Route path="/skill/:skillName" element={<Skill />} />
              <Route path="/skill/:skillName/quiz" element={<Quiz />} />
              <Route
                path="/skill/:skillName/test"
                element={<CodeKnowledge />}
              />
              <Route path="/" element={<Profile user={user} />} />
            </Routes>
          )}
        </Router>
      </Container>
    </ThemeProvider>
  );
};

export default App;
