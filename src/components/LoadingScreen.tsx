import { FC } from "react";

export const LoadingScreen: FC = () => {
  return (
    <div className="min-h-screen bg-[#FFE5E5] p-4 sm:p-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg overflow-hidden border-4 border-[#FF9EAA]">
        <div className="p-8 flex flex-col items-center justify-center min-h-[600px]">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#75C2F6] border-t-transparent mb-4"></div>
          <p className="text-[#575FCF] text-lg font-bold">ロード中...</p>
        </div>
      </div>
    </div>
  );
};
