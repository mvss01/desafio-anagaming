"use client";
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { Category } from "@/types/";

const ItemType = { CATEGORY: "CATEGORY" };

export default function DraggableCategory({
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
