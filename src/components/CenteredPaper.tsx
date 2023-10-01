import { Paper } from "@mui/material";
import { ReactNode } from "react";

export const CenteredPaper = ({ children }: { children: ReactNode }) => (
    <Paper
      elevation={3}
      style={{
        padding: "20px",
        width: "80%",
        margin: "5% auto",
        backgroundColor: "#2f3136",
      }}
    >
      {children}
    </Paper>
  );