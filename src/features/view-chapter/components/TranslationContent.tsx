import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonSpinner,
  useIonToast,
} from '@ionic/react';
import { alertCircle } from 'ionicons/icons';
import { useAtomValue } from 'jotai/react';
import { useParams } from 'react-router-dom';
import { settingsAtom } from 'stores/settings';
import { useChapterVerses } from '../api/useChapterVerses';
import { TranslationVerseItem } from './TranslationVerseItem';
import { BismiVerse } from './BismiVerse';
import DisplayError from 'components/DisplayError';

type Props = {
  bismiPre?: boolean;
};

const TranslationContent: React.FC<Props> = ({ bismiPre }) => {
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
    <div className="h-full">
      {!isLoading && bismiPre && <BismiVerse />}

      {chapterVerses?.pages.map((chapterVerses) =>
        chapterVerses.verses.map((verse, indx) => (
          <TranslationVerseItem verse={verse} key={indx} />
        ))
      )}

      {/* when error appears */}
      {!isFetchingNextPage && error ? (
        <DisplayError className="h-2/5" error={error} onRetry={fetchNextPage} />
      ) : null}

      {/* when api is loading */}
      {(isLoading || isFetchingNextPage) && (
        <div
          className={`${
            isFetchingNextPage ? 'h-12' : 'h-full'
          } w-full grid place-items-center`}
        >
          <IonSpinner />
        </div>
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
        <IonInfiniteScrollContent
          loadingSpinner={null}
          loadingText="Please, be patient..."
        />
      </IonInfiniteScroll>

      <div className="h-[90px]" />
    </div>
  );
};

export { TranslationContent };
