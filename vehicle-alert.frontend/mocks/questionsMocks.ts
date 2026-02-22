import { Question } from "@/interfaces/testCase";

export const questionsMocks: Omit<Question, "selectedAnswer">[] = [
  {
    id: 1,
    question: "What is JavaScript?",
    explanation:
      "JavaScript is a programming language primarily used for web development to add interactivity to web pages.",
  },
];
