import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonSpinner,
  IonText,
  IonToast,
  useIonToast,
} from '@ionic/react';
import { alertCircle } from 'ionicons/icons';
import { useAtom, useAtomValue } from 'jotai/react';
import { useParams } from 'react-router-dom';
import { quranLastReadAtom } from 'stores/quranLastRead';
import { settingsAtom } from 'stores/settings';
import { numToArabic, removeHtmlTags } from 'utils/string';
import { useChapterVerses } from '../api/useChapterVerses';
import { Fragment } from 'react';

type Props = {
  footer?: React.ReactNode;
};

const TranslationContent: React.FC<Props> = ({ footer }) => {
  const { id } = useParams<{ id: string }>();
  const [lastRead, setLastRead] = useAtom(quranLastReadAtom);
  const { quran: quranSettings } = useAtomValue(settingsAtom);
  const [presentToast] = useIonToast();

  const {
    isLoading,
    data: chapterVerses,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useChapterVerses({
    chapterId: parseInt(id),
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

      {chapterVerses?.pages.map((chapterVerses) =>
        chapterVerses.verses.map((verse, indx) => (
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
                  {verse.words
                    .filter((word) => word.char_type_name === 'word')
                    .map((word) => word.text_uthmani)
                    .join(' ')}
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
        ))
      )}

      <IonInfiniteScroll
        onIonInfinite={async (ev) => {
          await fetchNextPage()
            .then(() => ev.target.complete())
            .catch((err) => {
              console.error(err);

              presentToast({
                message: err.message,
                duration: 4500,
                position: 'bottom',
                icon: alertCircle,
              });
            });
        }}
      >
        <IonInfiniteScrollContent loadingText="Please, be patient..."></IonInfiniteScrollContent>
      </IonInfiniteScroll>

      {!hasNextPage && !isFetchingNextPage && !isLoading && footer}
    </div>
  );
};

export { TranslationContent };
