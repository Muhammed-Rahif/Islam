import React, { Fragment } from 'react';
import { Verse } from '../types/VersesByChapter';
import { useAtomValue } from 'jotai/react';
import { settingsAtom } from 'stores/settings';
import { BismiVerse } from 'components/BismiVerse';
import { IonChip } from '@ionic/react';

type Props = {
  verses: Verse[];
};

function ReadingQuran({ verses }: Props) {
  const { quran: quranSettings } = useAtomValue(settingsAtom);

  return (
    <div
      style={{
        fontSize: quranSettings.fontSize,
        fontFamily: quranSettings.fontFamily,
      }}
      lang="ar"
      className="leading-[220%] text-justify w-full after:inline-block after:content-['']"
    >
      <div className="w-36 active:w-28 hover:w-28 focus:w-28 absolute top-52 -right-20 active:right-0 duration-300 hover:right-0 focus:right-0">
        <IonChip
          role="button"
          color="primary"
          className="bg-blue-500 text-white"
        >
          Last Read
        </IonChip>
      </div>

      {verses.map(({ words }) =>
        words.map(({ text_uthmani, char_type_name }, indx) => (
          <Fragment key={indx}>
            {char_type_name === 'end'
              ? ` ﴿${text_uthmani}﴾ `
              : ` ${text_uthmani} `}
          </Fragment>
        ))
      )}
    </div>
  );
}

export { ReadingQuran };
