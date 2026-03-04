"use client";

import { useState, useEffect, useCallback } from "react";
import { initiatives, CATEGORIES } from "@/data/initiatives";
import InitiativeGrid from "@/components/InitiativeGrid";
import ProfileManager, { type Profile } from "@/components/ProfileManager";
import ExportPanel from "@/components/ExportPanel";

const STORAGE_KEY = "cg-profiles";
const ACTIVE_KEY = "cg-active-profile";

function loadProfiles(): Profile[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveProfiles(profiles: Profile[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
}

function loadActiveId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACTIVE_KEY);
}

function saveActiveId(id: string | null) {
  if (id) {
    localStorage.setItem(ACTIVE_KEY, id);
  } else {
    localStorage.removeItem(ACTIVE_KEY);
  }
}

export default function Home() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProfiles(loadProfiles());
    setActiveProfileId(loadActiveId());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    saveProfiles(profiles);
  }, [profiles, loaded]);

  useEffect(() => {
    if (!loaded) return;
    saveActiveId(activeProfileId);
  }, [activeProfileId, loaded]);

  const activeProfile = profiles.find((p) => p.id === activeProfileId) || null;
  const selectedIds = new Set(activeProfile?.selectedIds || []);

  const updateActiveProfile = useCallback(
    (updater: (p: Profile) => Profile) => {
      setProfiles((prev) =>
        prev.map((p) => (p.id === activeProfileId ? updater(p) : p))
      );
    },
    [activeProfileId]
  );

  const handleToggle = useCallback(
    (id: string) => {
      if (!activeProfileId) return;
      updateActiveProfile((p) => ({
        ...p,
        selectedIds: p.selectedIds.includes(id)
          ? p.selectedIds.filter((sid) => sid !== id)
          : [...p.selectedIds, id],
      }));
    },
    [activeProfileId, updateActiveProfile]
  );

  const handleCreateProfile = (name: string) => {
    const newProfile: Profile = {
      id: crypto.randomUUID(),
      name,
      selectedIds: [],
      createdAt: new Date().toISOString(),
    };
    setProfiles((prev) => [...prev, newProfile]);
    setActiveProfileId(newProfile.id);
  };

  const handleDeleteProfile = (id: string) => {
    setProfiles((prev) => prev.filter((p) => p.id !== id));
    if (activeProfileId === id) {
      setActiveProfileId(profiles.find((p) => p.id !== id)?.id || null);
    }
  };

  const handleRenameProfile = (id: string, name: string) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name } : p))
    );
  };

  const handleImportProfile = (profile: Profile) => {
    setProfiles((prev) => [...prev, profile]);
    setActiveProfileId(profile.id);
  };

  const handleSelectAll = () => {
    if (!activeProfileId) return;
    const allIds = initiatives.map((i) => i.id);
    updateActiveProfile((p) => ({ ...p, selectedIds: allIds }));
  };

  const handleDeselectAll = () => {
    if (!activeProfileId) return;
    updateActiveProfile((p) => ({ ...p, selectedIds: [] }));
  };

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Laden...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-mxi-purple text-white py-6 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">Common Ground - Portfolio Selector</h1>
          <p className="text-purple-200 text-sm mt-1">
            Selecteer de initiatieven die relevant zijn voor uw gemeente en exporteer als JSON
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <ProfileManager
              profiles={profiles}
              activeProfileId={activeProfileId}
              onSelectProfile={setActiveProfileId}
              onCreateProfile={handleCreateProfile}
              onDeleteProfile={handleDeleteProfile}
              onRenameProfile={handleRenameProfile}
            />

            <ExportPanel
              activeProfile={activeProfile}
              onImportProfile={handleImportProfile}
              selectedCount={selectedIds.size}
              totalCount={initiatives.length}
              onSelectAll={handleSelectAll}
              onDeselectAll={handleDeselectAll}
            />

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h2 className="font-semibold text-gray-800 mb-3">Filter op categorie</h2>
              <div className="space-y-1">
                <button
                  onClick={() => setCategoryFilter(null)}
                  className={`block w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${
                    categoryFilter === null
                      ? "bg-mxi-blue-light text-mxi-purple font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Alle categorieën
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat === categoryFilter ? null : cat)}
                    className={`block w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${
                      categoryFilter === cat
                        ? "bg-mxi-blue-light text-mxi-purple font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {!activeProfile ? (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Geen profiel geselecteerd
                </h2>
                <p className="text-gray-500 text-sm">
                  Maak een nieuw profiel aan of selecteer een bestaand profiel om initiatieven te kiezen.
                </p>
              </div>
            ) : (
              <InitiativeGrid
                selectedIds={selectedIds}
                onToggle={handleToggle}
                categoryFilter={categoryFilter}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
