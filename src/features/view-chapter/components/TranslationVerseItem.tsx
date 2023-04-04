import { IonText } from '@ionic/react';
import { useAtomValue } from 'jotai/react';
import { Fragment, useMemo } from 'react';
import { settingsAtom } from 'stores/settings';
import { numToArabic, removeHtmlTags } from 'utils/string';
import { Verse } from '../types/VersesByChapter';

const TranslationVerseItem: React.FC<{ verse: Verse }> = ({ verse }) => {
  const { quran: quranSettings } = useAtomValue(settingsAtom);

  // arabic verse words joined. eg: ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ
  const verseWords = useMemo(
    () =>
      verse.words
        .filter((word) => word.char_type_name === 'word')
        .map((word) => word.text_uthmani)
        .join(' '),
    [verse.words]
  );

  return (
    <Fragment>
      <div className="[direction:rtl]">
        <IonText lang="ar" className="ml-2 leading-8">
          <span
            className="mb-2 text-justify"
            style={{
              fontSize: quranSettings.fontSize,
              lineHeight: quranSettings.fontSize,
              fontFamily: quranSettings.fontFamily,
            }}
          >
            {verseWords}
            {`  ﴿${numToArabic(verse.verse_number)}﴾  `}
          </span>
        </IonText>
      </div>

      {verse?.translations.map((translation, indx) => (
        <IonText key={indx} className="text-left">
          {removeHtmlTags(translation.text)}

          <small className="opacity-20 block mb-2">
            - {translation.resource_name}
          </small>
        </IonText>
      ))}
      <hr className="my-4 opacity-20" />
    </Fragment>
  );
};

export { TranslationVerseItem };
