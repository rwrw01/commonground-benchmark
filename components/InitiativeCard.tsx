"use client";

import type { Initiative } from "@/data/initiatives";

type Props = {
  initiative: Initiative;
  selected: boolean;
  onToggle: (id: string) => void;
};

export default function InitiativeCard({ initiative, selected, onToggle }: Props) {
  return (
    <button
      onClick={() => onToggle(initiative.id)}
      className={`
        p-3 rounded-lg border-2 text-left transition-all duration-150 cursor-pointer
        text-sm leading-tight min-h-[60px] flex items-center
        ${
          selected
            ? "border-emerald-500 bg-emerald-50 text-emerald-900 shadow-md ring-1 ring-emerald-300"
            : "border-gray-200 bg-white text-gray-700 hover:border-gray-400 hover:shadow-sm"
        }
      `}
    >
      <div className="flex items-center gap-2 w-full">
        <div
          className={`w-4 h-4 rounded flex-shrink-0 flex items-center justify-center text-xs
            ${selected ? "bg-emerald-500 text-white" : "bg-gray-200 text-transparent"}
          `}
        >
          ✓
        </div>
        <span className="font-medium line-clamp-3">{initiative.name}</span>
      </div>
    </button>
  );
}
