import javascriptIcon from "@iconify/icons-devicon/javascript";
import typescriptIcon from "@iconify/icons-devicon/typescript";
import nodejsIcon from "@iconify/icons-devicon/nodejs";
import expressIcon from "@iconify/icons-devicon/express";
import reactIcon from "@iconify/icons-devicon/react";
import sqlIcon from "@iconify/icons-devicon/mysql";

export const userData = {
  avatarUrl: "https://avatars.githubusercontent.com/u/aaaaaa",
  name: "John Doe",
  bio: "Software Engineer at XYZ",
  repos: 50,
  contributions: 200,
  skills: [
    { name: "JavaScript", icon: javascriptIcon, lines: 5000, verified: true },
    { name: "TypeScript", icon: typescriptIcon, lines: 3000, verified: false },
    { name: "Node.js", icon: nodejsIcon, percentage: 60, verified: true },
    { name: "Express", icon: expressIcon, percentage: 40, verified: false },
    { name: "React", icon: reactIcon, percentage: 40, verified: false },
    { name: "SQL", icon: sqlIcon, percentage: 40, verified: false },
  ],
};
