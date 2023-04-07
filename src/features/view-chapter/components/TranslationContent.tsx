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
    <div className="mt-4 h-full">
      {/* when error appears */}
      {error ? <DisplayError error={error} /> : null}

      {/* when api is loading */}
      {isLoading && (
        <div className="w-full h-full grid place-items-center">
          <IonSpinner />
        </div>
      )}

      {!isLoading && bismiPre && <BismiVerse className="mb-3" />}

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

      <div className="h-[90px]" />
    </div>
  );
};

export { TranslationContent };
