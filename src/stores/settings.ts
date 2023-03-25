import { atomWithStorage } from 'jotai/utils';

const settingsStorageKey = 'settings';

export type SettingsType = {
  general: {
    language: string;
    theme: string;
  };
  quran: {
    fontSize: number;
    fontFamily: 'me_quran' | 'latheef' | 'amiri';
    translations: string[];
  };
};

const settingsAtom = atomWithStorage<SettingsType | null>(
  settingsStorageKey,
  {} as SettingsType
);

export { settingsAtom };
