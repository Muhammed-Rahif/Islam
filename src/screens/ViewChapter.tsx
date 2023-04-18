import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@ionic/react';
import React, { FC, createRef, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ReadingQuran,
  useChapter,
  useChapterVerses,
} from 'features/view-chapter';
import DisplayError from 'components/DisplayError';
import { BismiVerse } from 'components/BismiVerse';
import { TranslationQuran } from 'features/view-chapter';
import { useAtomValue } from 'jotai/react';
import { settingsAtom } from 'stores/settings';
import Divider from 'components/Divider';

const ViewChapter: FC = () => {
  const {
    quran: { translations },
  } = useAtomValue(settingsAtom);
  // eslint-disable-next-line no-undef
  const contentRef = createRef<HTMLIonContentElement>();
  const { chapterNo } = useParams<{
    chapterNo: string;
  }>();

  const {
    isLoading: isChapterLoading,
    data: chapterData,
    error: chapterDataError,
    refetch,
  } = useChapter({
    chapterId: parseInt(chapterNo),
  });
  const {
    data: chapterVersesData,
    isLoading: isVersesLoading,
    error: versesError,
    fetchNextPage,
    hasNextPage,
  } = useChapterVerses({
    chapterId: parseInt(chapterNo),
    translations: translations.map(({ id }) => id),
  });

  const {
    routeInfo: { search },
  } = useIonRouter();

  const { mode: modeParam } = useMemo(() => {
    const query = new URLSearchParams(search);
    let mode = query.get('mode');

    // setting mode to 'reading' when there is no 'mode' param or 'mode' param is other than 'translation' or 'reading'
    if (!mode || (mode !== 'reading' && mode !== 'translation'))
      mode = 'reading';

    return { mode };
  }, [search]);

  const [mode, setMode] = useState(modeParam);

  const chapterVerses = useMemo(
    () => chapterVersesData?.pages.map(({ verses }) => verses).flat() ?? [],
    [chapterVersesData]
  );

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons>
            <IonBackButton type="reset" defaultHref="/"></IonBackButton>
          </IonButtons>
          <IonTitle>
            {chapterData?.chapter.name_simple
              ? `${chapterNo}. ${chapterData?.chapter.name_simple}`
              : `Surah No. ${chapterNo}`}
          </IonTitle>
        </IonToolbar>

        <IonToolbar>
          <IonSegment
            className="mx-auto mb-1.5 w-full max-w-[calc(100%-1.5rem)]"
            value={mode}
            onIonChange={(e) => setMode(e.detail.value!)}
          >
            <IonSegmentButton value="translation">
              <IonLabel>Translation</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="reading">
              <IonLabel>Reading</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent
        scrollX={false}
        className="ion-padding"
        ref={contentRef}
        fullscreen
      >
        {/* when error appears */}
        {chapterDataError || versesError ? (
          <DisplayError
            className="h-full"
            error={chapterDataError ?? versesError}
            onRetry={refetch}
          />
        ) : null}

        {/* when api is loading */}
        {(isChapterLoading || isVersesLoading) && (
          <div className="grid h-full w-full place-items-center">
            <IonSpinner />
          </div>
        )}

        <div className="container mx-auto overflow-x-visible text-base">
          {!(isChapterLoading || isVersesLoading) &&
            chapterData?.chapter.bismillah_pre && <BismiVerse />}
          {mode === 'translation' ? (
            <TranslationQuran
              verses={chapterVerses}
              chapterId={parseInt(chapterNo)}
            />
          ) : (
            <ReadingQuran
              chapterId={parseInt(chapterNo)}
              verses={chapterVerses}
            />
          )}

          {hasNextPage && (
            <p
              role="button"
              onClick={async () => await fetchNextPage()}
              className="my-3.5 cursor-pointer text-center text-xs opacity-20 duration-300 [font-family:var(--ion-font-family)] active:scale-95"
            >
              Click here or Scroll down to load rest of the chapter
            </p>
          )}

          {!hasNextPage && <Divider text="The End" />}
        </div>

        <IonInfiniteScroll
          disabled={!hasNextPage}
          onIonInfinite={async (ev) => {
            await fetchNextPage();
            ev.target.complete();
          }}
        >
          <IonInfiniteScrollContent />
        </IonInfiniteScroll>
      </IonContent>

      {/* <IonFab
        slot="fixed"
        horizontal="end"
        vertical="bottom"
        aria-label="floating-action-button"
        className="opacity-60 active:opacity-100 hover:opacity-100 duration-300 focus:opacity-100"
      >
        <IonFabButton>
          <IonIcon icon={swapHorizontal}></IonIcon>
        </IonFabButton>

        <IonFabList side="top">
          <IonFabButton
            aria-label="scroll-to-top-btn"
            onClick={() => contentRef.current?.scrollToTop(700)}
          >
            <IonIcon icon={arrowUpOutline}></IonIcon>
          </IonFabButton>
          <IonFabButton
            aria-label="next-chapter-btn"
            routerLink={`/quran/${parseInt(chapterNo) + 1}`}
            disabled={parseInt(chapterNo) === 114}
          >
            <IonIcon icon={arrowRedoOutline}></IonIcon>
          </IonFabButton>
          <IonFabButton
            aria-label="previous-chapter-btn"
            routerLink={`/quran/${parseInt(chapterNo) - 1}`}
            disabled={parseInt(chapterNo) === 1}
          >
            <IonIcon icon={arrowUndoOutline}></IonIcon>
          </IonFabButton>
        </IonFabList>
      </IonFab> */}
    </IonPage>
  );
};

export default ViewChapter;
