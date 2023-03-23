import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { arrowUp } from 'ionicons/icons';
import { createRef, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useChapter } from 'features/view-chapter/api/useChapter';
import { ReadingContent } from 'features/view-chapter';
import { TranslationContent } from 'features/view-chapter/components/TranslationContent';

const ViewChapter: React.FC = () => {
  const contentRef = createRef<HTMLIonContentElement>();
  const [type, setType] = useState('reading');
  const [isScrolled, setIsScrolled] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { isLoading: isChapterLoading, data: chapterData } = useChapter({
    chapterId: parseInt(id),
  });

  const scrollToTop = useCallback(() => {
    contentRef.current?.scrollToTop(500);
  }, [contentRef]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons className="flex items-center justify-center" slot="start">
            <IonBackButton className="" defaultHref="/"></IonBackButton>
          </IonButtons>
          <IonTitle>
            {id}.{' '}
            {isChapterLoading ? 'Loading' : chapterData?.chapter.name_simple}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        className="ion-padding"
        onIonScroll={(e) => {
          if (e.detail.scrollTop > 30) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
        }}
        scrollEvents
        ref={contentRef}
        fullscreen
        scrollX={false}
        scrollY={false}
      >
        <IonSegment
          className="mb-3"
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
          <ReadingContent bismiPre={chapterData?.chapter.bismillah_pre} />
        ) : (
          <TranslationContent />
        )}
      </IonContent>

      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        {isScrolled && (
          <IonFabButton size="small" onClick={scrollToTop}>
            <IonIcon icon={arrowUp}></IonIcon>
          </IonFabButton>
        )}
      </IonFab>
    </IonPage>
  );
};

export default ViewChapter;
