import {
  Avatar,
  Typography,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";

const userData = {
  avatarUrl: "https://avatars.githubusercontent.com/u/aaaaaa",
  name: "John Doe",
  bio: "Software Developer at XYZ",
  repos: 50,
  contributions: 200,
};

type UserData = {
  avatarUrl: string;
  name: string;
};

export const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserData>();

  useEffect(() => {
    const fetchUser = async () => {
      const userRequest = await fetch("http://localhost:3000/api/users/me", {
        credentials: "include",
      });

      const userData = await userRequest.json();

      setUser(userData);
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  if (isLoading)
    return (
      <Paper
        elevation={3}
        style={{ padding: "20px", width: "600px", height: "600px" }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <CircularProgress color="inherit" size={16} />
        </Box>
      </Paper>
    );

  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", width: "600px", height: "600px" }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar
          src={user?.avatarUrl || userData.avatarUrl}
          style={{ width: "100px", height: "100px", marginBottom: "10px" }}
        />
        <Typography variant="h5" gutterBottom>
          {user?.name || userData.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {userData.bio}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Repos: {userData.repos}
        </Typography>
        <Typography variant="body2">
          Contributions: {userData.contributions}
        </Typography>
      </Box>
    </Paper>
  );
};
