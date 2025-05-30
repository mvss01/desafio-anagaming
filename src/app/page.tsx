"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { FaGithub } from "react-icons/fa";

const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();

  const handleGithubLogin = async () => {
    await login();
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#1c92d2] overflow-hidden">
      {/* Brilho animado no topo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-32 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 opacity-30 blur-2xl animate-glow" />

      {/* Efeito de partículas douradas (opcional, para um toque ainda mais especial) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <svg width="100%" height="100%">
          <circle cx="20%" cy="30%" r="2" fill="#FFD700" opacity="0.8">
            <animate
              attributeName="cy"
              values="30%;35%;30%"
              dur="4s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="60%" cy="70%" r="1.5" fill="#FFD700" opacity="0.7">
            <animate
              attributeName="cy"
              values="70%;75%;70%"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="80%" cy="40%" r="2.5" fill="#FFD700" opacity="0.5">
            <animate
              attributeName="cy"
              values="40%;45%;40%"
              dur="5s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
      <div className="relative z-10">
        <Card title="Bem-vindo" subtitle="Faça login para continuar">
          <Button onClick={handleGithubLogin} disabled={isLoading}>
            <span className="flex items-center justify-center">
              <FaGithub className="w-5 h-5 mr-2" />
              Entrar com GitHub
            </span>
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
