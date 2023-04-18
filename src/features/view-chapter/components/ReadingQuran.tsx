import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Verse } from '../types/VersesByChapter';
import { useAtom, useAtomValue } from 'jotai/react';
import { settingsAtom } from 'stores/settings';
import smoothScrollIntoView from 'smooth-scroll-into-view-if-needed';
import { IonChip, IonIcon, IonLabel } from '@ionic/react';
import Draggable from 'react-draggable';
import {
  chevronForwardOutline,
  closeOutline,
  pencilOutline,
  pinOutline,
} from 'ionicons/icons';
import LastReadChip from 'components/LastReadChip';
import { AnimatePresence } from 'framer-motion';
import { quranLastReadAtom } from 'stores/quranLastRead';

type Props = {
  verses: Verse[];
  chapterId: number;
};

function ReadingQuran({ verses, chapterId }: Props) {
  const { quran: quranSettings } = useAtomValue(settingsAtom);
  const [quranLastRead, setQuranLastRead] = useAtom(quranLastReadAtom);

  return (
    <div
      style={{
        fontSize: quranSettings.fontSize,
        fontFamily: quranSettings.fontFamily,
      }}
      lang="ar"
      className="reading-quran leading-[220%] relative text-justify w-full after:inline-block after:content-[''] overflow-x-visible"
    >
      {verses.map(({ words, verse_number }, indx) => (
        <span
          className="relative active:text-blue-200 cursor-pointer"
          onDoubleClick={() =>
            setQuranLastRead({
              ...quranLastRead,
              reading: {
                chapterId,
                verseId: verse_number,
              },
            })
          }
          key={indx}
        >
          <AnimatePresence>
            {quranLastRead?.reading?.chapterId === chapterId &&
              quranLastRead?.reading.verseId === verse_number && (
                <LastReadChip
                  onClose={() =>
                    setQuranLastRead({
                      ...quranLastRead,
                      reading: undefined,
                    })
                  }
                  key={indx}
                />
              )}
          </AnimatePresence>

          {words.map(({ text_uthmani, char_type_name }, indx) => (
            <Fragment key={indx}>
              {char_type_name === 'end'
                ? ` ﴿${text_uthmani}﴾ `
                : ` ${text_uthmani} `}
            </Fragment>
          ))}
        </span>
      ))}
    </div>
  );
}

export { ReadingQuran };
