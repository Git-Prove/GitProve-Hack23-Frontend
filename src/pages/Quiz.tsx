import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, Typography, List, ListItem } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { CenteredPaper } from "../components";

export const Quiz: React.FC = () => {
  const { skillName } = useParams<{ skillName: string }>();
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.post(
          OPENAI_ENDPOINT,
          {
            prompt: `Generate 4 quiz questions about ${skillName}`,
          },
          {
            headers: {
              Authorization: `Bearer ${OPENAI_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        const generatedQuestions = response.data.choices[0].text
          .split("\n")
          .filter((q: unknown) => q);
        setQuestions(generatedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [skillName]);

  const handleSubmit = async () => {
    let totalScore = 0;
    for (let i = 0; i < answers.length; i++) {
      const evaluation = await evaluateAnswer(questions[i], answers[i]);
      totalScore += evaluation.score;
    }

    setScore(totalScore);

    if (totalScore >= 3) {
      alert("You passed the test!");
    } else {
      alert("You did not pass the test. Try again.");
    }
  };

  const evaluateAnswer = async (question: string, answer: string) => {
    try {
      const response = await axios.post(
        OPENAI_ENDPOINT,
        {
          prompt: `Evaluate the answer to the question "${question}": ${answer}`,
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const evaluationText = response.data.choices[0].text.trim();
      // You'll need to interpret the evaluationText to get a score
      // For simplicity, I'm assuming a score of 1 if the evaluation is positive
      return { score: evaluationText.includes("correct") ? 1 : 0 };
    } catch (error) {
      console.error("Error evaluating answer:", error);
      return { score: 0 };
    }
  };

  return (
    <CenteredPaper>
      <Button onClick={() => navigate("/")}>Back</Button>
      <Typography variant="h4">Quiz for {skillName}</Typography>
      <List>
        {questions.map((question, index) => (
          <ListItem key={index}>
            <Typography variant="h6">{question}</Typography>
            <TextField
              label="Your Answer"
              variant="outlined"
              fullWidth
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[index] = e.target.value;
                setAnswers(newAnswers);
              }}
            />
            {/* Add a button here to record voice if needed */}
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
      {score !== null && (
        <Typography variant="h5">Your score: {score}/4</Typography>
      )}
    </CenteredPaper>
  );
};
