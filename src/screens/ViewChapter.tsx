import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@ionic/react';
import { createRef, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useChapter } from 'features/view-chapter';
import { ReadingContent } from 'features/view-chapter';
import { TranslationContent } from 'features/view-chapter';
import {
  arrowRedoOutline,
  arrowUndoOutline,
  arrowUpOutline,
  swapHorizontal,
} from 'ionicons/icons';
import DisplayError from 'components/DisplayError';

const ViewChapter: React.FC = () => {
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
            className="w-full max-w-[calc(100%-1.5rem)] mx-auto mb-1.5"
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

      <IonContent className="ion-padding" ref={contentRef} fullscreen>
        {/* when error appears */}
        {chapterDataError ? (
          <DisplayError
            className="h-full"
            error={chapterDataError}
            onRetry={refetch}
          />
        ) : null}

        {/* when api is loading */}
        {isChapterLoading && (
          <div className="w-full h-full grid place-items-center">
            <IonSpinner />
          </div>
        )}

        {mode === 'translation' ? (
          <TranslationContent
            startFrom={2}
            bismiPre={chapterData?.chapter.bismillah_pre}
          />
        ) : (
          <>
            {/* 
              only render if the 'pages.start' data is availiable, 
              because this required in child component to fetch data.
            */}
            {chapterData?.chapter.pages.length && (
              <ReadingContent
                bismiPre={chapterData?.chapter.bismillah_pre}
                pages={{
                  start: chapterData.chapter.pages[0],
                  end: chapterData.chapter.pages[1],
                }}
              />
            )}
          </>
        )}
      </IonContent>

      <IonFab
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
      </IonFab>
    </IonPage>
  );
};

export default ViewChapter;
