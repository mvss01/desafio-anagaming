"use client";

import { Event } from "@/types";
import React from "react";
import Image from "next/image";

export default function DetailsClient({ event }: { event: Event | null }) {
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-green-900">
        <div className="bg-green-800/80 rounded-lg px-8 py-8 flex flex-col gap-2">
          <span className="text-xl text-yellow-400 font-bold">
            Odd não encontrada.
          </span>
          <a
            href="/home"
            className="mt-4 bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-2 rounded-lg shadow transition-all flex flex-col text-center"
          >
            Voltar para Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-green-900 py-10 px-4 flex flex-col items-center">
      {/* Header */}
      <div className="flex flex-col items-center mb-4">
        <Image
          src="/bet.svg"
          alt="Bet Logo"
          width={64}
          height={64}
          className="mb-2"
        />
        <span className="text-2xl font-bold text-white tracking-wide">
          Detalhes da Odd
        </span>
        <span className="text-green-200 mt-1">{event.sport_title}</span>
        <a
          href="/home"
          className="mt-4 bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-2 rounded-lg shadow transition-all"
        >
          Voltar para Home
        </a>
      </div>

      {/* Evento */}
      <div className="bg-green-900/70 rounded-xl shadow-xl px-8 py-8 flex flex-col items-center w-full max-w-2xl mb-8">
        <div className="text-center mb-4">
          <span className="text-white text-xl font-bold">
            {event.home_team}{" "}
            {event.away_team && <span className="text-green-300">vs</span>}{" "}
            {event.away_team}
          </span>
          <div className="text-green-300 text-sm mt-2">
            {new Date(event.commence_time).toLocaleString("pt-BR")}
          </div>
        </div>
        <div className="w-full">
          <span className="text-green-200 font-semibold text-lg">
            Odds por Casa de Aposta:
          </span>
          {(!event.bookmakers || event.bookmakers.length === 0) && (
            <div className="text-yellow-400 mt-2">
              Nenhuma odd disponível no momento.
            </div>
          )}
          {event.bookmakers?.map((bookmaker) => (
            <div key={bookmaker.key} className="mt-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-yellow-400 text-green-900 font-bold px-3 py-1 rounded-lg shadow">
                  {bookmaker.title}
                </span>
              </div>
              {bookmaker.markets.map((market) => {
                // Ordena outcomes da melhor para a pior odd (price desc)
                const sortedOutcomes = [...market.outcomes].sort(
                  (a, b) => b.price - a.price
                );
                return (
                  <div key={market.key} className="mb-3 ml-4">
                    <div className="text-green-300 font-semibold capitalize mb-1">
                      {market.key.replace(/_/g, " ")}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {sortedOutcomes.map((outcome, idx) => (
                        <div
                          key={idx}
                          className="bg-green-700 text-yellow-300 font-bold px-3 py-1 rounded-lg shadow flex items-center"
                        >
                          <span>{outcome.name}</span>
                          <span className="ml-2 text-white">
                            {outcome.price}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="text-green-400 text-xs mt-1">
                      Atualizado:{" "}
                      {new Date(market.last_update).toLocaleString("pt-BR")}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Voltar */}
      <a
        href="/home"
        className="mt-4 bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-2 rounded-lg shadow transition-all"
      >
        Voltar para Home
      </a>
    </div>
  );
}
