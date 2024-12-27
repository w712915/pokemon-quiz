import { FC } from "react";
import { GameState } from "../types/pokemon";

interface EndScreenProps {
  gameState: GameState;
  onRestart: () => void;
}

export const EndScreen: FC<EndScreenProps> = ({ gameState, onRestart }) => {
  return (
    <div className="min-h-screen bg-[#FFE5E5] p-4 sm:p-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden border-4 border-[#FF9EAA] hover:shadow-2xl transition-shadow duration-300">
        <div className="p-8 flex flex-col items-center justify-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FF9EAA] mb-6">
            ゲーム終了！
          </h1>
          <div className="space-y-4 mb-8">
            <p className="text-xl text-[#575FCF] text-center">
              スコア: {gameState.score}点
            </p>
            <p className="text-xl text-[#575FCF] text-center">
              最高連続正解: {gameState.highestStreak}回
            </p>
          </div>
          <button
            onClick={onRestart}
            className="bg-gradient-to-r from-[#75C2F6] to-[#5D9DF6] hover:from-[#4DA3FF] hover:to-[#3D82FF] text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            もう一度プレイ！
          </button>
        </div>
      </div>
    </div>
  );
};
