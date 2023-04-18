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
            className="relative my-4 w-full overflow-x-visible text-right leading-[220%] after:inline-block after:content-['']"
          >
            {text_uthmani} ﴿{numToArabic(verse_number)}﴾
          </div>

          {translations.map((translation, indx) => (
            <div
              style={{
                fontSize: quranSettings.fontSize,
              }}
              key={indx}
              className="mt-2.5 block leading-[130%]"
            >
              {removeHtmlTags(translation.text)}
            </div>
          ))}

          <Divider className="my-4 opacity-20" />
        </>
      ))}
    </>
  );
});

export { TranslationQuran };
