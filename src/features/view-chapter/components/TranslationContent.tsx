import { IonItem, IonSpinner, IonText, IonToast } from '@ionic/react';
import MotionCaret from 'components/MotionCaret';
import { alertCircle } from 'ionicons/icons';
import { useAtom } from 'jotai/react';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { quranLastReadAtom } from 'stores/quranLastRead';
import { numToArabic, removeHtmlTags } from 'utils/string';
import { useChapterVerses } from '../api/useChapterVerses';

const TranslationContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [lastRead, setLastRead] = useAtom(quranLastReadAtom);

  const {
    isLoading,
    data: chapterVerses,
    error,
  } = useChapterVerses({
    chapterId: parseInt(id),
    per_page: 286,
  });

  return (
    <div className="mt-4 h-full pb-12 overflow-y-scroll overflow-x-hidden ion-content-scroll-host">
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
              <span className="mb-2 text-justify">
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
          <IonText className="text-left">
            {removeHtmlTags(verse?.translations[0].text)}
            <small className="opacity-20 block mb-4">
              - {verse.translations[0].resource_name}
            </small>
          </IonText>
        </Fragment>
      ))}
    </div>
  );
};

export { TranslationContent };
