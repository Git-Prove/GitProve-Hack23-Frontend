import { useEffect, useState } from "react";
import {
  Avatar,
  Typography,
  CircularProgress,
  Grid,
  Chip,
  Badge,
  Button,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { CenteredPaper } from "../components";
import { userData } from "../MOCKS/userData";

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
      <CenteredPaper>
        <CircularProgress color="inherit" size={16} />
      </CenteredPaper>
    );

  return (
    <CenteredPaper>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
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
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="body2" gutterBottom>
            Repos: {userData.repos}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Contributions: {userData.contributions}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Skills:
          </Typography>
          {userData.skills.map((skill) => (
            <Badge
              key={skill.name}
              badgeContent={skill.verified ? "verified" : "unverified"}
              color={skill.verified ? "primary" : "error"}
            >
              <Link to={`/skill/${skill.name}`}>
                <Chip
                  icon={<Icon icon={skill.icon} />}
                  label={`${skill.name} (${skill.lines || skill.percentage} ${
                    skill.lines ? "lines" : "%"
                  })`}
                  clickable
                  style={{ margin: "5px", cursor: "pointer" }}
                />
              </Link>
            </Badge>
          ))}
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "20px", float: "right" }}
            disabled
          >
            + Add more skills
          </Button>
        </Grid>
      </Grid>
    </CenteredPaper>
  );
};
