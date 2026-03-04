"use client";

import { useRef } from "react";
import type { Profile } from "./ProfileManager";

type Props = {
  activeProfile: Profile | null;
  onImportProfile: (profile: Profile) => void;
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
};

export default function ExportPanel({
  activeProfile,
  onImportProfile,
  selectedCount,
  totalCount,
  onSelectAll,
  onDeselectAll,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    if (!activeProfile) return;
    const data = JSON.stringify(activeProfile, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeProfile.name.replace(/\s+/g, "-").toLowerCase()}-commonground.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.name && Array.isArray(data.selectedIds)) {
          onImportProfile({
            id: crypto.randomUUID(),
            name: data.name,
            selectedIds: data.selectedIds,
            createdAt: data.createdAt || new Date().toISOString(),
          });
        } else {
          alert("Ongeldig bestandsformaat. Verwacht: { name, selectedIds[] }");
        }
      } catch {
        alert("Kon het bestand niet lezen. Zorg dat het een geldig JSON bestand is.");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-gray-800">Acties</h2>
        <div className="text-sm text-gray-600">
          <span className="font-bold text-mxi-purple">{selectedCount}</span>
          <span> / {totalCount} geselecteerd</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={onSelectAll}
          disabled={!activeProfile}
          className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Alles selecteren
        </button>
        <button
          onClick={onDeselectAll}
          disabled={!activeProfile}
          className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Alles deselecteren
        </button>
        <button
          onClick={handleExport}
          disabled={!activeProfile}
          className="px-3 py-1.5 text-sm bg-mxi-purple text-white rounded hover:bg-mxi-purple-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          JSON Exporteren
        </button>
        <label className="px-3 py-1.5 text-sm bg-mxi-blue text-white rounded hover:bg-mxi-blue/80 cursor-pointer transition-colors">
          JSON Importeren
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}
