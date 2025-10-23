import React from "react";

const Loading = () => {
  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gradient-to-br from-green-300/10 via-teal-400/10 to-blue-500/10 backdrop-blur-sm">
      <div className="flex space-x-2">
        <span className="w-3 h-3 bg-teal-500 rounded-full animate-[bounceSmooth_1.2s_ease-in-out_infinite] [animation-delay:-0.3s]"></span>
        <span className="w-3 h-3 bg-teal-600 rounded-full animate-[bounceSmooth_1.2s_ease-in-out_infinite] [animation-delay:-0.15s]"></span>
        <span className="w-3 h-3 bg-teal-700 rounded-full animate-[bounceSmooth_1.2s_ease-in-out_infinite]"></span>
      </div>

      {/* custom keyframes */}
      <style>{`
        @keyframes bounceSmooth {
          0%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
