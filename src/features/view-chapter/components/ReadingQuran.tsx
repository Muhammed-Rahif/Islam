/* eslint-disable react/display-name */
import React, { Fragment, useCallback } from 'react';
import { Verse } from '../types/VersesByChapter';
import { useAtom, useAtomValue } from 'jotai/react';
import { settingsAtom } from 'stores/settings';
import LastReadChip from 'components/LastReadChip';
import { AnimatePresence } from 'framer-motion';
import { quranLastReadAtom } from 'stores/quranLastRead';

type Props = {
  verses: Verse[];
  chapterId: number;
};

const ReadingQuran = React.memo(({ verses, chapterId }: Props) => {
  const { quran: quranSettings } = useAtomValue(settingsAtom);
  const [quranLastRead, setQuranLastRead] = useAtom(quranLastReadAtom);

  const onDblClickVerse = useCallback(
    (verseNo: number) =>
      setQuranLastRead({
        ...quranLastRead,
        reading: {
          chapterId,
          verseId: verseNo,
        },
      }),
    [chapterId, quranLastRead, setQuranLastRead]
  );

  const removeLastReadQuran = useCallback(
    () =>
      setQuranLastRead({
        ...quranLastRead,
        reading: undefined,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [quranLastRead]
  );

  return (
    <div
      style={{
        fontSize: quranSettings.fontSize,
        fontFamily: quranSettings.fontFamily,
      }}
      lang="ar"
      className="reading-quran relative w-full overflow-x-visible text-justify leading-[220%] after:inline-block after:content-['']"
    >
      {verses.map(({ words, verse_number }, indx) => (
        <span
          className="relative cursor-pointer active:text-blue-200"
          onDoubleClick={() => onDblClickVerse(verse_number)}
          key={indx}
        >
          <AnimatePresence>
            {quranLastRead?.reading?.chapterId === chapterId &&
              quranLastRead?.reading.verseId === verse_number && (
                <LastReadChip onClose={removeLastReadQuran} key={indx} />
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
});

export { ReadingQuran };
