import { IonItem, IonSpinner, IonText, IonToast } from '@ionic/react';
import MotionCaret from 'components/MotionCaret';
import { alertCircle } from 'ionicons/icons';
import { useAtom, useAtomValue } from 'jotai/react';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { quranLastReadAtom } from 'stores/quranLastRead';
import { settingsAtom } from 'stores/settings';
import { numToArabic, removeHtmlTags } from 'utils/string';
import { useChapterVerses } from '../api/useChapterVerses';

type Props = {
  footer?: React.ReactNode;
};

const TranslationContent: React.FC<Props> = ({ footer }) => {
  const { id } = useParams<{ id: string }>();
  const [lastRead, setLastRead] = useAtom(quranLastReadAtom);
  const { quran: quranSettings } = useAtomValue(settingsAtom);

  const {
    isLoading,
    data: chapterVerses,
    error,
  } = useChapterVerses({
    chapterId: parseInt(id),
    per_page: 286,
    translations: quranSettings.translations.map((t) => t.id),
  });

  return (
    <div className="mt-4 h-full pb-10 overflow-y-scroll overflow-x-visible ion-content-scroll-host">
      {/* when error appears */}
      {error ? (
        <IonToast
          isOpen={Boolean(error)}
          message={error ? (error as any).message : error}
          duration={4500}
          icon={alertCircle}
        />
      ) : null}

      {/* when api is loading */}
      {isLoading && (
        <IonItem
          lines="none"
          className="flex items-center w-full [--inner-padding-end:0px]"
        >
          <IonSpinner className="mx-auto" />
        </IonItem>
      )}

      {chapterVerses?.verses.map((verse, indx) => (
        <Fragment key={indx}>
          <div
            key={indx}
            className="[direction:rtl]"
            onDoubleClick={(e) => {
              setLastRead({
                reading: lastRead?.reading,
                translation: {
                  chapterId: parseInt(id),
                  verseId: verse?.id,
                },
              });
            }}
          >
            <IonText lang="ar" className="ml-2">
              <span
                className="mb-2 text-justify"
                style={{
                  fontSize: quranSettings.fontSize,
                  lineHeight: quranSettings.fontSize,
                  fontFamily: quranSettings.fontFamily,
                }}
              >
                <MotionCaret
                  title="You last read this verse"
                  show={
                    lastRead?.translation?.chapterId.toString() === id &&
                    lastRead?.translation?.verseId === verse?.id
                  }
                />
                {verse.words
                  .filter((word) => word.char_type_name === 'word')
                  .map((word) => word.text_uthmani)
                  .join(' ')}
                {`  ﴿${numToArabic(++indx)}﴾  `}
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
      ))}

      {!isLoading && footer}
    </div>
  );
};

export { TranslationContent };
