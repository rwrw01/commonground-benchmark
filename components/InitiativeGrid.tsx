"use client";

import { initiatives, CATEGORIES } from "@/data/initiatives";
import InitiativeCard from "./InitiativeCard";

type Props = {
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  categoryFilter: string | null;
};

export default function InitiativeGrid({ selectedIds, onToggle, categoryFilter }: Props) {
  const filtered = categoryFilter
    ? initiatives.filter((i) => i.category === categoryFilter)
    : initiatives;

  const grouped = CATEGORIES.map((cat) => ({
    category: cat,
    items: filtered.filter((i) => i.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="space-y-6">
      {grouped.map((group) => (
        <div key={group.category}>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-1">
            {group.category}
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({group.items.filter((i) => selectedIds.has(i.id)).length}/{group.items.length})
            </span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
            {group.items.map((initiative) => (
              <InitiativeCard
                key={initiative.id}
                initiative={initiative}
                selected={selectedIds.has(initiative.id)}
                onToggle={onToggle}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
