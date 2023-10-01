import { Icon } from "@iconify/react";
import {
  Typography,
  Grid,
  Button,
  Link,
  Box,
  List,
  ListItem,
  Tooltip,
} from "@mui/material";
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
    JavaScript: [
      "JavaScript-Framework-Project",
      "E-commerce-JavaScript",
      "JavaScript-Game-Engine",
    ],
    TypeScript: ["TypeScript-Library", "TypeScript-WebApp"],
    SQL: ["SQL-Database-Manager", "SQL-Data-Analysis"],
    "Node.js": ["Nodejs-API-Server", "Nodejs-Chat-App"],
    Express: ["Express-Middleware-Library", "Express-Web-Server"],
    React: ["React-Component-Library", "React-SPA"],
  };

  const totalLinesOfCode = {
    JavaScript: 5000,
    TypeScript: 3000,
    SQL: 2000,
    "Node.js": 4000,
    Express: 2500,
    React: 6000,
  };

  const getVerificationStatus = (skill: any) => {
    if (
      skill.verificationMethod === "Expert" ||
      ["JavaScript", "Node.js"].includes(skill.name)
    )
      return "verified";
    if (skill.verificationMethod === "Quiz") return "pending";
    return "unverified";
  };

  const getVerificationColor = (status: any) => {
    if (status === "verified") return "green";
    if (status === "pending") return "yellow";
    return "red";
  };

  const verificationStatus = getVerificationStatus(skill);

  return (
    <CenteredPaper>
      <Box p={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Button
              variant="outlined"
              color="primary"
              style={{
                marginBottom: "20px",
                position: "absolute",
                top: "10px",
                left: "10px",
              }}
              onClick={() => navigate("/")}
            >
              Back to Profile
            </Button>
            <Icon icon={skill.icon} width="100" height="100" />
            <Typography variant="h4" gutterBottom style={{ marginTop: "15px" }}>
              {skill.name}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              style={{ marginTop: "15px" }}
            >
              <Typography variant="body1" gutterBottom>
                Verified:
              </Typography>
              <Tooltip title={verificationStatus} arrow placement="top">
                <Box
                  ml={1}
                  bgcolor={getVerificationColor(verificationStatus)}
                  width={10}
                  height={10}
                  borderRadius="50%"
                />
              </Tooltip>
            </Box>
            <Typography
              variant="body1"
              gutterBottom
              style={{ marginTop: "15px" }}
            >
              Proficiency: {skill.lines || skill.percentage}{" "}
              {skill.lines ? "lines" : "%"}
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              style={{ marginTop: "15px" }}
            >
              {/* @ts-ignore */}
              Total Lines of Code in Repos: {totalLinesOfCode[skill.name]}
            </Typography>
            <Typography variant="h6" gutterBottom style={{ marginTop: "15px" }}>
              Projects:
            </Typography>
            <List style={{ maxHeight: "150px", overflow: "auto" }}>
              {/* @ts-ignore */}
              {mockedRepos[skill.name]?.map((repo) => (
                <ListItem key={repo} style={{ justifyContent: "center" }}>
                  <Link
                    href={`https://github.com/user/${repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo}
                  </Link>
                </ListItem>
              ))}
            </List>
            <Typography variant="h6" gutterBottom style={{ marginTop: "15px" }}>
              Verification Options:
            </Typography>
            <Button
              onClick={() => navigate(`/skill/${skill.name}/quiz`)}
              variant="outlined"
              color="primary"
              style={{
                margin: "10px 4px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              Quiz
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate(`/skill/${skill.name}/test`)}
              style={{
                margin: "10px 4px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              Knowledge Test
            </Button>
            <Button
              variant="outlined"
              color="primary"
              style={{
                margin: "10px 4px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              Verification by Expert
            </Button>
          </Grid>
        </Grid>
      </Box>
    </CenteredPaper>
  );
};
