import { Button, Stack, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export const LoginSignUp = () => {
  const loginUser = () => console.log("Login");
  const signUpUser = () => console.log("SignUp");

  return (
    <>
      <Stack sx={{ marginBottom: "20px", marginRight: "63%" }}>
        <Typography variant="h2" fontWeight="600">
          GitProve
        </Typography>
        <Typography variant="body1">Unlocking Developers' Potential</Typography>
      </Stack>
      <Button
        variant="contained"
        color="primary"
        startIcon={<GitHubIcon />}
        onClick={loginUser}
        sx={{ width: 240, marginBottom: "10px" }}
      >
        Login with GitHub
      </Button>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<GitHubIcon />}
        onClick={signUpUser}
        sx={{ width: 240, marginBottom: "10px" }}
      >
        Sign-up with GitHub
      </Button>
    </>
  );
};
