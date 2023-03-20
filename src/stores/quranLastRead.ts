import { atomWithStorage } from 'jotai/utils';

const quranLastReadStorageKey = 'quranLastRead';

export type QuranLastReadType = {
  translation?: {
    chapterId: number;
    verseId: number;
  };
  reading?: {
    chapterId: number;
    verseId: number;
  };
};

const quranLastReadAtom = atomWithStorage<QuranLastReadType | null>(
  quranLastReadStorageKey,
  null
);

export { quranLastReadAtom };
