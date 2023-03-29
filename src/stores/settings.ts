import { Translations } from 'features/settings';
import { atomWithStorage } from 'jotai/utils';

const settingsStorageKey = 'settings';

export type SettingsType = {
  general: {
    language: string;
    theme: string;
  };
  quran: {
    fontSize: '75%' | '100%' | '125%' | '150%' | '175%' | '200%';
    fontFamily: string;
    translations: Translations;
  };
};

export const availableSettings = {
  general: {
    theme: ['light', 'dark'],
  },
  quran: {
    fontSize: ['75%', '100%', '125%', '150%', '175%', '200%'],
    fontFamily: [
      'Me Quran',
      'Al Qalam',
      'Noorehira',
      'Al Qalam Quran',
      'Maddina',
      'Noorehidayat',
      'Quran Standard',
      'Arabic Quran',
      'Scheherazade',
      'Saleem',
      'Amiri',
      'Amiri Quran',
      'Aref Ruqaa',
      'Katibeh',
      'Lateef',
      'Mirza',
      'Noto Naskh Arabic',
      'Rakkas',
      'Reem Kufi',
    ],
  },
};

const settingsAtom = atomWithStorage<SettingsType>(settingsStorageKey, {
  general: {
    language: 'en',
    theme: 'light',
  },
  quran: {
    fontSize: '100%',
    fontFamily: 'Me Quran',
    translations: [
      {
        id: 131,
        name: 'Dr. Mustafa Khattab, the Clear Quran',
        author_name: 'Dr. Mustafa Khattab',
        slug: 'clearquran-with-tafsir',
        language_name: 'english',
        translated_name: {
          name: 'Dr. Mustafa Khattab',
        },
      },
    ],
  },
});

export { settingsAtom };
