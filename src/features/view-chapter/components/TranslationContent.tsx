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
import { TranslationVerseItem } from './TranslationVerseItem';

type Props = {
  footer?: React.ReactNode;
};

const TranslationContent: React.FC<Props> = ({ footer }) => {
  const { chapterNo: chapterNo } = useParams<{ chapterNo: string }>();
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
    chapterId: parseInt(chapterNo),
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
        <div className="w-full h-full grid place-items-center">
          <IonSpinner />
        </div>
      )}

      {chapterVerses?.pages.map((chapterVerses) =>
        chapterVerses.verses.map((verse, indx) => (
          <TranslationVerseItem verse={verse} key={indx} />
        ))
      )}

      <IonInfiniteScroll
        disabled={!hasNextPage}
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
