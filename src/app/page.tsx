"use client";

import { useState } from "react";
import { GameState, QuizQuestion } from "@/types/pokemon";
import { StartScreen } from "@/components/StartScreen";
import { EndScreen } from "@/components/EndScreen";
import { LoadingScreen } from "@/components/LoadingScreen";
import { QuizScreen } from "@/components/QuizScreen";

export default function PokemonQuiz() {
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    currentStreak: 0,
    highestStreak: 0,
    screenState: "start",
    difficulty: "easy",
    questionNumber: 1,
    totalQuestions: 10,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const startGame = () => {
    setGameState({
      score: 0,
      currentStreak: 0,
      screenState: "playing",
      highestStreak: 0,
      difficulty: "easy",
      questionNumber: 1,
      totalQuestions: 10,
    });
    fetchNewQuestion();
  };

  async function fetchNewQuestion() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/pokemon");
      const data = await response.json();
      setQuestion(data);
    } catch (error) {
      console.error("Failed to fetch question:", error);
    }
    setIsLoading(false);
  }

  function handleAnswerSelect(answer: string) {
    setSelectedAnswer(answer);
    setShowResult(true);

    const isCorrect = answer === question?.correctAnswer;
    setGameState((prev) => ({
      ...prev,
      score: isCorrect ? prev.score + 100 : prev.score,
      currentStreak: isCorrect ? prev.currentStreak + 1 : 0,
      highestStreak: isCorrect
        ? Math.max(prev.highestStreak, prev.currentStreak + 1)
        : prev.highestStreak,
    }));

    setTimeout(() => {
      setShowResult(false);
      setSelectedAnswer(null);
      if (gameState.questionNumber < gameState.totalQuestions) {
        setGameState((prev) => ({
          ...prev,
          questionNumber: prev.questionNumber + 1,
        }));
        fetchNewQuestion();
      } else {
        setGameState((prev) => ({
          ...prev,
          screenState: "end",
        }));
      }
    }, 2000);
  }

  if (gameState.screenState === "start") {
    return <StartScreen onStart={startGame} />;
  }

  if (gameState.screenState === "end") {
    return <EndScreen gameState={gameState} onRestart={startGame} />;
  }

  if (isLoading || !question) {
    return <LoadingScreen />;
  }

  return (
    <QuizScreen
      question={question}
      gameState={gameState}
      showResult={showResult}
      selectedAnswer={selectedAnswer}
      onAnswerSelect={handleAnswerSelect}
    />
  );
}
