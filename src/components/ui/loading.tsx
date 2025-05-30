"use client";

import React from "react";
import Spin from "./spin";

const BetLoading: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-green-900">
      {/* Logo e nome */}
      <div className="flex flex-col items-center mb-4">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-600 shadow-lg mb-2">
          <svg width="32" height="32" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="14" fill="#fff" />
            <text
              x="50%"
              y="55%"
              textAnchor="middle"
              fill="#16a34a"
              fontSize="14"
              fontWeight="bold"
              dy=".3em"
              fontFamily="Arial"
            >
              BET
            </text>
          </svg>
        </div>
        <span className="text-xl font-bold text-white tracking-wide">
          ANA Gaming
        </span>
        <span className="text-xs text-green-200 uppercase tracking-widest">
          Carregando...
        </span>
      </div>

      <Spin />
    </div>
  );
};

export default BetLoading;
