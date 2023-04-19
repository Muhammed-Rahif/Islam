/* eslint-disable react/display-name */
import React from 'react';
import { Verse } from '../types/VersesByChapter';
import { useAtom, useAtomValue } from 'jotai/react';
import { settingsAtom } from 'stores/settings';
import { numToArabic } from 'utils/string';
import { removeHtmlTags } from 'utils/string';
import Divider from 'components/Divider';
import LastReadChip from 'components/LastReadChip';
import { quranLastReadAtom } from 'stores/quranLastRead';

type Props = {
  verses: Verse[];
  chapterId: number;
};

const TranslationQuran = React.memo(({ verses, chapterId }: Props) => {
  const { quran: quranSettings } = useAtomValue(settingsAtom);
  const [quranLastRead, setQuranLastRead] = useAtom(quranLastReadAtom);

  return (
    <>
      {verses.map(({ verse_number, text_uthmani, translations }, indx) => (
        <div
          key={indx}
          className="relative active:text-blue-200"
          onDoubleClick={() =>
            setQuranLastRead({
              ...quranLastRead,
              translation: {
                chapterId,
                verseId: verse_number,
              },
            })
          }
        >
          {quranLastRead?.translation?.chapterId === chapterId &&
            quranLastRead?.translation?.verseId === verse_number && (
              <LastReadChip className="right-0" />
            )}

          <div
            style={{
              fontSize: quranSettings.fontSize,
              fontFamily: quranSettings.fontFamily,
            }}
            dir="rtl"
            lang="ar"
            className="relative my-4 w-full overflow-x-visible text-right leading-[220%] after:inline-block after:content-['']"
          >
            {text_uthmani} ﴿{numToArabic(verse_number)}﴾
          </div>

          {translations.map(({ text, resource_name }, indx) => (
            <div
              style={{
                fontSize: quranSettings.fontSize,
              }}
              key={indx}
              className="mt-2.5 block leading-[130%]"
            >
              {removeHtmlTags(text)}

              <span className="block text-xs opacity-20">
                - {resource_name}
              </span>
            </div>
          ))}

          <Divider className="my-4 opacity-20">Verse {verse_number}</Divider>
        </div>
      ))}
    </>
  );
});

export { TranslationQuran };
