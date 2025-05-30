"use client";

import React, { useState, useCallback } from "react";
import { uniqBy, orderBy } from "lodash";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export interface Sport {
  key: string;
  title: string;
  group: string;
}

interface Category {
  id: string;
  name: string;
}

export interface Event {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: Bookmaker[];
}

interface Bookmaker {
  key: string;
  title: string;
  last_update: string;
  markets: Market[];
}

interface Market {
  key: string;
  outcomes: Outcome[];
}

interface Outcome {
  name: string;
  price: number;
}

const ItemType = { CATEGORY: "CATEGORY" };

function DraggableCategory({
  category,
  index,
  moveCategory,
  isFavorite,
  onToggleFavorite,
}: {
  category: Category;
  index: number;
  moveCategory: (dragIndex: number, hoverIndex: number) => void;
  isFavorite: boolean;
  onToggleFavorite: (cat: Category) => void;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ItemType.CATEGORY,
    hover(item: { index: number }, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Só move se cruzar a metade do item
      if (
        (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
        (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
      ) {
        return;
      }

      moveCategory(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.CATEGORY,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`flex items-center justify-between px-4 py-2 rounded-lg mb-2 shadow transition-all cursor-move ${
        isDragging
          ? "bg-green-700/40"
          : isFavorite
          ? "bg-green-600 text-white"
          : "bg-green-900 text-green-200"
      }`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <span className="font-medium">{category.name}</span>
      <button
        onClick={() => onToggleFavorite(category)}
        className={`ml-4 px-2 py-1 rounded transition ${
          isFavorite
            ? "bg-yellow-400 text-green-900"
            : "bg-green-800 text-yellow-300"
        }`}
      >
        {isFavorite ? "★" : "☆"}
      </button>
    </div>
  );
}

export default function HomeClient({
  sports,
  initialEvents,
}: {
  sports: Sport[];
  initialEvents: Record<string, Event[]>;
}) {
  const [favorites, setFavorites] = useState<Category[]>([]);
  const [events] = useState(initialEvents);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  // Prepare categories from sports
  const categories: Category[] = sports.map((s) => ({
    id: s.key,
    name: s.title,
  }));

  const toggleExpandCategory = useCallback((id: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  // Favoritar/desfavoritar
  const toggleFavorite = useCallback(
    (cat: Category) => {
      setFavorites((prev) =>
        prev.find((c) => c.id === cat.id)
          ? prev.filter((c) => c.id !== cat.id)
          : uniqBy([...prev, cat], "id")
      );
    },
    [setFavorites]
  );

  // Drag and drop handler
  const moveFavorite = useCallback(
    (from: number, to: number) => {
      setFavorites((prev) => {
        const updated = [...prev];
        const [moved] = updated.splice(from, 1);
        updated.splice(to, 0, moved);
        return updated;
      });
    },
    [setFavorites]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-green-900 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-600 shadow-lg mb-2">
              <svg width="36" height="36" viewBox="0 0 32 32">
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
            <span className="text-2xl font-bold text-white tracking-wide">
              Bem-vindo à Plataforma de Odds Esportivas
            </span>
            <span className="text-green-200 mt-1">
              Organize suas categorias favoritas e acompanhe as melhores odds!
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg text-green-200 font-semibold mb-3">
                Categorias disponíveis
              </h2>
              <div className="bg-green-900/60 rounded-lg p-4 max-h-80 overflow-y-auto">
                {categories.length === 0 ? (
                  <div className="text-yellow-400">
                    Nenhuma categoria encontrada.
                  </div>
                ) : (
                  orderBy(categories, "name").map((cat) => {
                    const isFavorite = favorites.find((f) => f.id === cat.id);
                    const isExpanded = expandedCategories.has(cat.id);

                    const baseClass =
                      "flex items-center justify-between px-4 py-2 rounded-lg mb-2 shadow transition-all cursor-pointer select-none";
                    const favoriteClass = isFavorite
                      ? isExpanded
                        ? "bg-green-900/60 text-white"
                        : "bg-green-600 text-white"
                      : isExpanded
                      ? "bg-green-600 text-green-200"
                      : "bg-green-800 text-green-200";

                    return (
                      <React.Fragment key={cat.id}>
                        <div
                          className={`${baseClass} ${favoriteClass}`}
                          onClick={() => toggleExpandCategory(cat.id)}
                        >
                          <span>{cat.name}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(cat);
                              }}
                              className={`px-2 py-1 rounded ${
                                isFavorite
                                  ? "bg-yellow-400 text-green-900"
                                  : "bg-green-700 text-yellow-300"
                              }`}
                            >
                              {isFavorite ? "★" : "☆"}
                            </button>
                          </div>
                        </div>
                        {isExpanded && (
                          <div className="bg-green-800/60 rounded-lg p-4 mb-4">
                            {events[cat.id]?.length ? (
                              events[cat.id].map((event) => {
                                const bestOdds: Record<
                                  string,
                                  { price: number; bookmaker: string }
                                > = {};
                                event.bookmakers?.forEach((bookmaker) => {
                                  bookmaker.markets?.forEach((market) => {
                                    market.outcomes?.forEach((outcome) => {
                                      if (
                                        !bestOdds[outcome.name] ||
                                        outcome.price >
                                          bestOdds[outcome.name].price
                                      ) {
                                        bestOdds[outcome.name] = {
                                          price: outcome.price,
                                          bookmaker: bookmaker.title,
                                        };
                                      }
                                    });
                                  });
                                });
                                return (
                                  <div
                                    key={event.id}
                                    className="flex flex-col md:flex-row md:items-center justify-between py-3 border-b border-green-700 last:border-0"
                                  >
                                    <div>
                                      <span className="font-bold text-white">
                                        {event.home_team}
                                        {event.away_team
                                          ? ` vs ${event.away_team}`
                                          : ""}
                                      </span>
                                      <span className="ml-2 text-green-300 text-sm">
                                        {new Date(
                                          event.commence_time
                                        ).toLocaleString("pt-BR")}
                                      </span>
                                    </div>
                                    <div className="grid grid-cols-1 gap-3 mt-2 md:mt-0">
                                      {Object.entries(bestOdds).map(
                                        ([
                                          outcomeName,
                                          { price, bookmaker },
                                        ]) => (
                                          <span
                                            key={outcomeName}
                                            className="bg-yellow-400 text-green-900 font-bold px-3 py-1 rounded-lg shadow flex items-center justify-center gap-1 min-w-[120px]"
                                            title={`Melhor odd na ${bookmaker}`}
                                          >
                                            {outcomeName}: {price}{" "}
                                            <span className="text-xs text-green-700">
                                              ({bookmaker})
                                            </span>
                                          </span>
                                        )
                                      )}
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <div className="text-green-400">
                                Nenhum jogo encontrado para {cat.name}.
                              </div>
                            )}
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })
                )}
              </div>
            </div>

            <div>
              <h2 className="text-lg text-yellow-300 font-semibold mb-3">
                Suas categorias favoritas (arraste para organizar)
              </h2>
              <div className="bg-green-900/60 rounded-lg p-4 min-h-[120px]">
                {favorites.length === 0 ? (
                  <div className="text-green-400">Nenhuma favorita ainda.</div>
                ) : (
                  favorites.map((cat, idx) => (
                    <DraggableCategory
                      key={cat.id}
                      category={cat}
                      index={idx}
                      moveCategory={moveFavorite}
                      isFavorite={true}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-lg text-green-200 font-semibold mb-3">
              Jogos recentes e melhores odds das suas categorias favoritas
            </h2>
            <div className="bg-green-900/60 rounded-lg p-4">
              {favorites.length === 0 ? (
                <div className="text-green-400">
                  Selecione categorias favoritas para ver jogos!
                </div>
              ) : (
                favorites.map((fav) =>
                  (events[fav.id] || []).length === 0 ? (
                    <div key={fav.id} className="text-green-400 mb-4">
                      Nenhum jogo encontrado para {fav.name}.
                    </div>
                  ) : (
                    <div key={fav.id} className="mb-8">
                      <div className="text-yellow-300 font-bold mb-2">
                        {fav.name}
                      </div>
                      {(events[fav.id] || []).map((event) => {
                        // Map para armazenar a melhor odd por outcome
                        const bestOdds: Record<
                          string,
                          { price: number; bookmaker: string }
                        > = {};

                        event.bookmakers?.forEach((bookmaker) => {
                          bookmaker.markets?.forEach((market) => {
                            market.outcomes?.forEach((outcome) => {
                              if (
                                !bestOdds[outcome.name] ||
                                outcome.price > bestOdds[outcome.name].price
                              ) {
                                bestOdds[outcome.name] = {
                                  price: outcome.price,
                                  bookmaker: bookmaker.title,
                                };
                              }
                            });
                          });
                        });

                        return (
                          <div
                            key={event.id}
                            className="flex flex-col md:flex-row md:items-center justify-between py-3 border-b border-green-800 last:border-0 gap-2"
                          >
                            <div className="md:w-1/2">
                              <span className="font-bold text-white">
                                {event.home_team}
                                {event.away_team
                                  ? ` vs ${event.away_team}`
                                  : ""}
                              </span>
                              <span className="ml-2 text-green-300 text-sm">
                                {new Date(event.commence_time).toLocaleString(
                                  "pt-BR"
                                )}
                              </span>
                            </div>
                            <div className="md:w-1/2 flex flex-wrap gap-3 mt-2 md:mt-0">
                              {Object.entries(bestOdds).map(
                                ([outcomeName, { price, bookmaker }]) => (
                                  <span
                                    key={outcomeName}
                                    className="bg-yellow-400 text-green-900 font-bold px-3 py-1 rounded-lg shadow flex items-center gap-1"
                                    title={`Melhor odd na ${bookmaker}`}
                                  >
                                    {outcomeName}: {price}{" "}
                                    <span className="text-xs text-green-700">
                                      ({bookmaker})
                                    </span>
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
