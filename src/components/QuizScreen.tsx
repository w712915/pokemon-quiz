import { FC } from "react";
import Image from "next/image";
import { GameState, QuizQuestion } from "@/types/pokemon";

interface QuizScreenProps {
  question: QuizQuestion;
  gameState: GameState;
  showResult: boolean;
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
}

export const QuizScreen: FC<QuizScreenProps> = ({
  question,
  gameState,
  showResult,
  selectedAnswer,
  onAnswerSelect,
}) => {
  return (
    <div className="min-h-screen bg-[#FFE5E5] p-4 sm:p-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden border-4 border-[#FF9EAA] hover:shadow-2xl transition-shadow duration-300">
        <div className="p-8 h-[600px] flex flex-col bg-gradient-to-b from-white/80 to-[#FFF8E8]/80">
          {/* 上部コンテンツ */}
          <div className="flex-none space-y-2">
            <div className="text-center">
              <h1 className="text-xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FF9EAA] mb-2 animate-pulse">
                このポケモンはだーれだ？
              </h1>
              <div className="text-sm sm:text-base text-[#7C73E6] mb-1 font-bold">
                もんだい {gameState.questionNumber}/{gameState.totalQuestions}
              </div>
              <div className="bg-gradient-to-r from-[#A5FFD6] to-[#84FFBE] rounded-full py-1 sm:py-2 px-3 sm:px-4 inline-block shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                <span className="text-xs sm:text-sm text-[#575FCF] font-bold">
                  スコア: {gameState.score} | れんぞく:{" "}
                  {gameState.currentStreak}
                </span>
              </div>
            </div>
          </div>

          {/* ポケモン画像 */}
          <div className="flex-grow flex items-center justify-center my-2 sm:my-4">
            <div className="relative w-40 h-40 sm:w-56 sm:h-56 bg-gradient-to-br from-[#FFF4E3] to-[#FFE5BC] rounded-full p-4 border-4 border-[#FFD93D] shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-float">
              <Image
                src={question.pokemon.sprites.front_default}
                alt="ポケモン"
                fill
                className="object-contain transform hover:scale-110 transition-transform duration-300"
                quality={80}
                priority
              />
            </div>
          </div>

          {/* 選択ボタン */}
          <div className="flex-none">
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-2">
              {question.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => onAnswerSelect(choice)}
                  disabled={showResult}
                  className={`p-2 sm:p-3 text-sm sm:text-lg rounded-2xl transition-all transform hover:scale-105 font-bold shadow-lg hover:shadow-xl
                    ${
                      showResult
                        ? choice === question.correctAnswer
                          ? "bg-gradient-to-r from-[#98FB98] to-[#7AF47A] text-white border-4 border-[#32CD32] animate-correct"
                          : selectedAnswer === choice
                          ? "bg-gradient-to-r from-[#FFB2B2] to-[#FF8989] text-white border-4 border-[#FF6B6B] animate-wrong"
                          : "bg-gradient-to-r from-[#E0E0E0] to-[#CCCCCC] border-4 border-[#A0A0A0]"
                        : "bg-gradient-to-r from-[#75C2F6] to-[#5D9DF6] hover:from-[#4DA3FF] hover:to-[#3D82FF] text-white border-4 border-[#318CE7]"
                    }`}
                >
                  {choice}
                </button>
              ))}
            </div>

            {/* 結果表示 */}
            <div className="h-16 sm:h-20">
              <div
                className={`text-center text-base sm:text-xl font-bold transition-all duration-300 transform ${
                  showResult ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
              >
                {selectedAnswer === question.correctAnswer ? (
                  <span className="text-[#32CD32] animate-bounce inline-block">
                    せいかい！ ٩(๑❛ᴗ❛๑)۶
                    <br />
                    すごーい！
                  </span>
                ) : (
                  <span className="text-[#FF6B6B] animate-bounce inline-block">
                    ざんねん... (｡•́︿•̀｡)
                    <br />
                    こたえは {question.correctAnswer} だよ！
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
