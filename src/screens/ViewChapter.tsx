import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { createRef, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useChapter } from 'features/view-chapter/api/useChapter';
import { ReadingContent } from 'features/view-chapter';
import { TranslationContent } from 'features/view-chapter/components/TranslationContent';

const ViewChapter: React.FC = () => {
  const contentRef = createRef<HTMLIonContentElement>();
  const [type, setType] = useState('reading');
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
    </IonPage>
  );
};

export default ViewChapter;
