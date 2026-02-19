import { create } from 'zustand';

interface Space {
  id: string;
  name: string;
  description?: string;
  icon_url?: string;
  theme_color?: string;
  is_private: boolean;
  owner_id: string;
  streams?: Stream[];
}

interface Stream {
  id: string;
  name: string;
  type: string;
  topic?: string;
  position: number;
}

interface SpacesState {
  spaces: Space[];
  activeSpace: Space | null;
  activeStream: Stream | null;
  setSpaces: (spaces: Space[]) => void;
  setActiveSpace: (space: Space) => void;
  setActiveStream: (stream: Stream) => void;
  addSpace: (space: Space) => void;
}

export const useSpacesStore = create<SpacesState>((set) => ({
  spaces: [],
  activeSpace: null,
  activeStream: null,
  setSpaces: (spaces) => set({ spaces }),
  setActiveSpace: (space) => set({ activeSpace: space, activeStream: null }),
  setActiveStream: (stream) => set({ activeStream: stream }),
  addSpace: (space) => set((state) => ({ spaces: [...state.spaces, space] })),
}));
