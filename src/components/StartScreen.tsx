import { FC } from "react";

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#FFE5E5] p-4 sm:p-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden border-4 border-[#FF9EAA] hover:shadow-2xl transition-shadow duration-300">
        <div className="p-8 flex flex-col items-center justify-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FF9EAA] mb-6">
            ポケモンクイズ
          </h1>
          <p className="text-lg sm:text-xl text-[#575FCF] mb-8 text-center">
            ポケモンの姿を見て、名前を当てよう！
          </p>
          <button
            onClick={onStart}
            className="bg-gradient-to-r from-[#75C2F6] to-[#5D9DF6] hover:from-[#4DA3FF] hover:to-[#3D82FF] text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            スタート！
          </button>
        </div>
      </div>
    </div>
  );
};
