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
  IonPopover,
  IonSegment,
  IonSegmentButton,
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

const ViewChapter: React.FC = () => {
  const contentRef = createRef<HTMLIonContentElement>();
  const { chapterNo } = useParams<{
    chapterNo: string;
  }>();

  const { isLoading: isChapterLoading, data: chapterData } = useChapter({
    chapterId: parseInt(chapterNo),
  });

  const {
    routeInfo: { search },
  } = useIonRouter();

  const { type: typeParam } = useMemo(() => {
    const query = new URLSearchParams(search);
    let type = query.get('type');

    // setting type to 'reading' when there is no 'type' param or 'type' param is other than 'translation' or 'reading'
    if (!type || (type !== 'reading' && type !== 'translation'))
      type = 'reading';

    return { type };
  }, [search]);

  const [type, setType] = useState(typeParam);
  const { push } = useIonRouter();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons className="flex items-center justify-center" slot="start">
            <IonBackButton type="reset" defaultHref="/"></IonBackButton>
          </IonButtons>
          <IonTitle>
            {isChapterLoading
              ? `Surah No. ${chapterNo}`
              : `${chapterNo}. ${chapterData?.chapter.name_simple}`}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        className="ion-padding"
        ref={contentRef}
        fullscreen
        scrollX={false}
        scrollY={false}
      >
        <IonSegment
          className="mb-0.5"
          value={type}
          onIonChange={(e) => setType(e.detail.value!)}
        >
          <IonSegmentButton value="translation">
            <IonLabel>Translation</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="reading">
            <IonLabel>Reading</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {type === 'translation' ? (
          <TranslationContent />
        ) : (
          <>
            {/* only render if the start pages data is availiable, because this required in child component to fetch data */}
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

      <IonFab slot="fixed" horizontal="end" vertical="bottom">
        <IonFabButton>
          <IonIcon icon={swapHorizontal}></IonIcon>
        </IonFabButton>

        {/* <IonPopover
          trigger="to-top-btn"
          side="left"
          triggerAction="context-menu"
        >
          <IonContent className="ion-padding">Scroll to top</IonContent>
        </IonPopover>
        <IonPopover trigger="next-btn" side="left" triggerAction="context-menu">
          <IonContent className="ion-padding">Next chapter</IonContent>
        </IonPopover>
        <IonPopover trigger="prev-btn" side="left" triggerAction="context-menu">
          <IonContent className="ion-padding">Previous chapter</IonContent>
        </IonPopover> */}

        <IonFabList side="top">
          <IonFabButton
            onClick={() =>
              document.querySelector('.ion-content-scroll-host')?.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
            id="to-top-btn"
          >
            <IonIcon icon={arrowUpOutline}></IonIcon>
          </IonFabButton>
          <IonFabButton
            id="next-btn"
            routerLink={`/quran/${parseInt(chapterNo) + 1}`}
            disabled={parseInt(chapterNo) === 114}
          >
            <IonIcon icon={arrowRedoOutline}></IonIcon>
          </IonFabButton>
          <IonFabButton
            id="prev-btn"
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
