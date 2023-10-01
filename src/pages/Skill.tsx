import { Icon } from "@iconify/react";
import { Typography, Grid, Button, Link } from "@mui/material";
import { CenteredPaper } from "../components";
import { userData } from "../MOCKS/userData";
import { useParams, useNavigate } from "react-router-dom";

export const Skill: React.FC = () => {
  const { skillName } = useParams<{ skillName: string }>();
  const navigate = useNavigate();
  const skill = userData.skills.find((s) => s.name === skillName);

  if (!skill) {
    return <div>Skill not found</div>;
  }

  const mockedRepos = {
    JavaScript: ["Repo1-using-JavaScript", "Repo2-using-JavaScript", "Repo3-using-JavaScript"],
    TypeScript: ["Repo1-using-TypeScript", "Repo2-using-TypeScript"],
    SQL: ["Repo1-using-SQL", "Repo2-using-SQL"],
    "Node.js": ["Repo1-using-Nodejs", "Repo2-using-Nodejs"],
    Express: ["Repo1-using-Express", "Repo2-using-Express"],
    React: ["Repo1-using-React", "Repo2-using-React"],
  };

  return (
    <CenteredPaper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            style={{ marginBottom: "20px", float: "left" }}
            onClick={() => navigate("/")}
          >
            Back to Profile
          </Button>
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
            {/* @ts-ignore */}
            {mockedRepos[skill.name]?.map((repo) => (
              <li key={repo}>
                <Link
                  href={`https://github.com/user/${repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo}
                </Link>
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
