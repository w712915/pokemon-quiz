export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
  };
}

export interface QuizQuestion {
  pokemon: Pokemon;
  choices: string[];
  correctAnswer: string;
}

export interface GameState {
  screenState: "start" | "playing" | "end";
  score: number;
  currentStreak: number;
  highestStreak: number;
  difficulty: "easy" | "medium" | "hard";
  questionNumber: number;
  totalQuestions: number;
}
