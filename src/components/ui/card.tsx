import React, { ReactNode } from "react";
import { FaCrown } from "react-icons/fa";

interface CardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, subtitle, children }) => (
  <div
    className="
    max-w-sm mx-auto p-8
    bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#1c92d2]
    rounded-3xl shadow-2xl border-4 border-yellow-400
    relative overflow-hidden
    animate-fade-in
  "
  >
    {/* Efeito de brilho animado */}
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 blur-lg opacity-70 animate-glow" />

    {/* Ícone temático */}
    <div className="flex justify-center mb-3">
      <FaCrown className="text-yellow-400 text-4xl drop-shadow-lg animate-bounce" />
    </div>

    <h3 className="text-2xl font-extrabold text-center mb-2 text-yellow-300 drop-shadow-lg tracking-wide uppercase">
      {title}
    </h3>
    {subtitle && (
      <p className="text-center text-gray-200 mb-6 font-medium drop-shadow">
        {subtitle}
      </p>
    )}
    <div className="bg-black/40 p-4 rounded-xl shadow-inner">{children}</div>
  </div>
);
