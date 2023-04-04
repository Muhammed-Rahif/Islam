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
import { useLocation, useParams } from 'react-router-dom';
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
  const { id } = useParams<{ id: string }>();
  const { isLoading: isChapterLoading, data: chapterData } = useChapter({
    chapterId: parseInt(id),
  });
  let { search } = useLocation();

  const chapterName = useMemo(() => {
    const query = new URLSearchParams(search);
    const chapterName = query.get('chapterName');
    return chapterName ?? 'Loading';
  }, [search]);

  const [type, setType] = useState('reading');
  const { push } = useIonRouter();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons className="flex items-center justify-center" slot="start">
            <IonBackButton className="" defaultHref="/"></IonBackButton>
          </IonButtons>
          <IonTitle>
            {id}.{' '}
            {isChapterLoading ? chapterName : chapterData?.chapter.name_simple}
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

        {type === 'reading' ? (
          <>
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
        ) : (
          <TranslationContent bismiPre={chapterData?.chapter.bismillah_pre} />
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
            routerLink={`/quran/${parseInt(id) + 1}`}
            disabled={parseInt(id) === 114}
          >
            <IonIcon icon={arrowRedoOutline}></IonIcon>
          </IonFabButton>
          <IonFabButton
            id="prev-btn"
            routerLink={`/quran/${parseInt(id) - 1}`}
            disabled={parseInt(id) === 1}
          >
            <IonIcon icon={arrowUndoOutline}></IonIcon>
          </IonFabButton>
        </IonFabList>
      </IonFab>
    </IonPage>
  );
};

export default ViewChapter;
