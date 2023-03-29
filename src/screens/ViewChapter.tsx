import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
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
import { chevronBack, chevronForward } from 'ionicons/icons';

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

  const footer = useMemo(
    () => (
      <div className="[direction:ltr] flex justify-between">
        <IonButton
          routerLink={`/quran/${parseInt(id) - 1}`}
          size="small"
          color="light"
          disabled={parseInt(id) === 1}
        >
          Prev Chapter
          <IonIcon slot="start" size="small" icon={chevronBack} />
        </IonButton>
        <IonButton
          size="small"
          color="light"
          onClick={async () =>
            document.querySelector('.ion-content-scroll-host')?.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
        >
          To top
        </IonButton>
        <IonButton
          size="small"
          color="light"
          routerLink={`/quran/${parseInt(id) + 1}`}
          disabled={parseInt(id) === 114}
        >
          Next Chapter
          <IonIcon slot="end" size="small" icon={chevronForward} />
        </IonButton>
      </div>
    ),
    [id]
  );

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
                footer={footer}
                pages={{
                  start: chapterData.chapter.pages[0],
                  end: chapterData.chapter.pages[1],
                }}
              />
            )}
          </>
        ) : (
          <TranslationContent footer={footer} />
        )}
      </IonContent>
    </IonPage>
  );
};

export default ViewChapter;
