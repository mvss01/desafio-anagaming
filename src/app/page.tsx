"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Spin from "@/components/ui/spin";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const { login, isLoading, isAuthenticated } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/home");
    }
  }, [isAuthenticated, router]);

  const handleGithubLogin = async () => {
    await login();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-green-900">
      <div className="flex flex-col items-center mb-8">
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
          Acesse sua conta
        </span>
      </div>

      {/* Card de login */}
      <div className="bg-green-800/60 rounded-xl shadow-xl px-8 py-8 flex flex-col items-center w-80">
        <span className="text-white font-semibold mb-4 text-center">
          Entre com sua conta do GitHub para acessar a plataforma de odds
          esportivas.
        </span>
        <button
          onClick={handleGithubLogin}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg shadow transition-all duration-200 w-full mb-2 disabled:opacity-60"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.16c-3.2.7-3.87-1.39-3.87-1.39-.53-1.36-1.29-1.72-1.29-1.72-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.71 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.97 10.97 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.09 0 4.44-2.69 5.41-5.25 5.7.42.36.79 1.09.79 2.2v3.26c0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" />
          </svg>
          Entrar com GitHub
        </button>
        {isLoading && <Spin />}
      </div>
    </div>
  );
};

export default Login;
