"use client";

import { useState } from "react";

export type Profile = {
  id: string;
  name: string;
  selectedIds: string[];
  createdAt: string;
};

type Props = {
  profiles: Profile[];
  activeProfileId: string | null;
  onSelectProfile: (id: string) => void;
  onCreateProfile: (name: string) => void;
  onDeleteProfile: (id: string) => void;
  onRenameProfile: (id: string, name: string) => void;
};

export default function ProfileManager({
  profiles,
  activeProfileId,
  onSelectProfile,
  onCreateProfile,
  onDeleteProfile,
  onRenameProfile,
}: Props) {
  const [newName, setNewName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const handleCreate = () => {
    const name = newName.trim();
    if (!name) return;
    onCreateProfile(name);
    setNewName("");
    setIsCreating(false);
  };

  const handleRename = (id: string) => {
    const name = editName.trim();
    if (!name) return;
    onRenameProfile(id, name);
    setEditingId(null);
    setEditName("");
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-gray-800">Profielen</h2>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          + Nieuw profiel
        </button>
      </div>

      {isCreating && (
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            placeholder="Naam (bijv. Gemeente Alkmaar)"
            className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button
            onClick={handleCreate}
            className="px-3 py-1.5 bg-emerald-600 text-white rounded text-sm hover:bg-emerald-700"
          >
            Opslaan
          </button>
          <button
            onClick={() => setIsCreating(false)}
            className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
          >
            Annuleer
          </button>
        </div>
      )}

      {profiles.length === 0 ? (
        <p className="text-sm text-gray-500 italic">Geen profielen. Maak een nieuw profiel aan om te beginnen.</p>
      ) : (
        <div className="space-y-1">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer transition-colors ${
                activeProfileId === profile.id
                  ? "bg-blue-50 border border-blue-200"
                  : "hover:bg-gray-50 border border-transparent"
              }`}
            >
              {editingId === profile.id ? (
                <div className="flex gap-2 flex-1">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleRename(profile.id);
                      if (e.key === "Escape") setEditingId(null);
                    }}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  <button
                    onClick={() => handleRename(profile.id)}
                    className="text-xs px-2 py-1 bg-emerald-600 text-white rounded"
                  >
                    OK
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex-1" onClick={() => onSelectProfile(profile.id)}>
                    <div className="font-medium text-sm">{profile.name}</div>
                    <div className="text-xs text-gray-500">
                      {profile.selectedIds.length} geselecteerd
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setEditingId(profile.id);
                      setEditName(profile.name);
                    }}
                    className="text-gray-400 hover:text-blue-600 text-xs"
                    title="Hernoemen"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Profiel "${profile.name}" verwijderen?`)) {
                        onDeleteProfile(profile.id);
                      }
                    }}
                    className="text-gray-400 hover:text-red-600 text-xs"
                    title="Verwijderen"
                  >
                    🗑️
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
