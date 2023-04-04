import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonSpinner,
  IonToast,
  useIonToast,
} from '@ionic/react';
import { alertCircle } from 'ionicons/icons';
import { useParams } from 'react-router-dom';
import { useVersesUthmani } from '../api/useVersesUthmani';
import { BismiVerse } from './BismiVerse';
import { useMemo } from 'react';
import { InlinedVerses } from './InlinedVerses';

type Props = {
  pages: {
    start: number;
    end: number;
  };
  bismiPre?: boolean;
};

const ReadingContent: React.FC<Props> = ({ bismiPre, pages }) => {
  const { chapterNo } = useParams<{ chapterNo: string }>();
  const {
    isLoading,
    data: versesUthmaniData,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useVersesUthmani({
    chapterId: parseInt(chapterNo),
    pages,
  });

  const [presentToast] = useIonToast();

  // page numbers of current surah as in uthmani quran. eg: [121,122,123,124]
  const pageNums: number[] = useMemo(
    () =>
      versesUthmaniData?.pageParams
        ? [
            pages.start,
            ...(versesUthmaniData.pageParams as number[]).filter(Boolean),
          ]
        : [],
    [versesUthmaniData?.pageParams]
  );

  return (
    <div className="[direction:rtl] leading-9 pb-10 text-justify mt-2 mb-3 h-full overflow-y-scroll overflow-x-visible ion-content-scroll-host">
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

      {!isLoading && bismiPre && <BismiVerse />}

      {/* maping through pages */}
      {versesUthmaniData?.pages.map((versesUthmani, index) => (
        <span key={index}>
          <InlinedVerses versesData={versesUthmani} />

          <p className="opacity-20 text-center text-xs [direction:ltr]">
            {pageNums[index]}
          </p>
          <hr className="opacity-20 my-3.5" />
        </span>
      ))}

      {hasNextPage && !isFetchingNextPage && !isLoading && (
        <p
          onClick={async () => await fetchNextPage()}
          className="opacity-20 text-center active:scale-95 duration-300 text-xs [font-family:var(--ion-font-family)] cursor-pointer"
        >
          Click here or Scroll down to load more
        </p>
      )}

      <IonInfiniteScroll
        className="[direction:ltr]"
        style={{
          height: hasNextPage ? window.innerHeight * 0.4 : 0,
        }}
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
    </div>
  );
};

export { ReadingContent };
