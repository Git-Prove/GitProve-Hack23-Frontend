import { Icon } from "@iconify/react";
import {
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { CenteredPaper } from "../components";
import { userData } from "../MOCKS/userData";

interface SkillProps {
  skill: typeof userData.skills[0];
}

export const Skill: React.FC<SkillProps> = ({ skill }) => {
  const mockedRepos = [
    "Repo1-using-JavaScript",
    "Repo2-using-JavaScript",
    "Repo3-using-JavaScript",
  ]; // Mocked data for JavaScript. You can add similar data for other skills.

  return (
    <CenteredPaper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Icon icon={skill.icon} width="100" height="100" />
          <Typography variant="h4" gutterBottom>
            {skill.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Verified: {skill.verified ? "Yes" : "No"}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Proficiency: {skill.lines || skill.percentage}{" "}
            {skill.lines ? "lines" : "%"}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Projects:
          </Typography>
          <ul>
            {mockedRepos.map((repo) => (
              <li key={repo}>
                <a href={`https://github.com/user/${repo}`} target="_blank" rel="noopener noreferrer">
                  {repo}
                </a>
              </li>
            ))}
          </ul>
          <Typography variant="h6" gutterBottom>
            Verification Options:
          </Typography>
          <Button variant="outlined" style={{ margin: "10px 0" }}>
            Quiz
          </Button>
          <Button variant="outlined" style={{ margin: "10px 0" }}>
            Knowledge Test
          </Button>
          <Button variant="outlined" style={{ margin: "10px 0" }}>
            Verification by Expert
          </Button>
        </Grid>
      </Grid>
    </CenteredPaper>
  );
};
