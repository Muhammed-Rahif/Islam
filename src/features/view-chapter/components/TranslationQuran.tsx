/* eslint-disable react/display-name */
import React from 'react';
import { Verse } from '../types/VersesByChapter';
import { useAtomValue } from 'jotai/react';
import { settingsAtom } from 'stores/settings';
import { numToArabic } from 'utils/string';
import { removeHtmlTags } from 'utils/string';
import Divider from 'components/Divider';

type Props = {
  verses: Verse[];
  chapterId: number;
};

const TranslationQuran = React.memo(({ verses }: Props) => {
  const { quran: quranSettings } = useAtomValue(settingsAtom);
  // const [quranLastRead, setQuranLastRead] = useAtom(quranLastReadAtom);

  return (
    <>
      {verses.map(({ verse_number, text_uthmani, translations }) => (
        <>
          <div
            style={{
              fontSize: quranSettings.fontSize,
              fontFamily: quranSettings.fontFamily,
            }}
            dir="rtl"
            lang="ar"
            className="my-4 leading-[220%] relative text-right w-full after:inline-block after:content-[''] overflow-x-visible"
          >
            {text_uthmani} ﴿{numToArabic(verse_number)}﴾
          </div>

          {translations.map((translation, indx) => (
            <div
              style={{
                fontSize: quranSettings.fontSize,
              }}
              key={indx}
              className="block mt-2.5 leading-[130%]"
            >
              {removeHtmlTags(translation.text)}
            </div>
          ))}

          <Divider className="opacity-20 my-4" />
        </>
      ))}
    </>
  );
});

export { TranslationQuran };
