import { Fragment } from 'react';
import { VersesUthmani } from '../types/VersesUthmani';
import { BismiVerse } from './BismiVerse';
import { useAtomValue } from 'jotai/react';
import { settingsAtom } from 'stores/settings';
import { numToArabic } from 'utils/string';

const InlinedVerses: React.FC<{ versesData: VersesUthmani }> = ({
  versesData,
}) => {
  const { quran: quranSettings } = useAtomValue(settingsAtom);

  return (
    <>
      {versesData.verses.map((verse, indx) => {
        if (verse.text_uthmani === 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ')
          return <BismiVerse ayahNo={++indx} key={'bismi'} />;

        return (
          <span
            key={indx}
            style={{
              fontSize: quranSettings.fontSize,
              lineHeight: quranSettings.fontSize,
              fontFamily: quranSettings.fontFamily,
            }}
          >
            {verse?.text_uthmani}{' '}
            {`  ﴿${numToArabic(verse.verse_key.replace(/\d+:/, ''))}﴾  `}
          </span>
        );
      })}
    </>
  );
};

export { InlinedVerses };
