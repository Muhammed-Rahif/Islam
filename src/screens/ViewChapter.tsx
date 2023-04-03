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
  useIonRouter,
} from '@ionic/react';
import { createRef, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useChapter } from 'features/view-chapter';
import { ReadingContent } from 'features/view-chapter';
import { TranslationContent } from 'features/view-chapter';
import { chevronBack, chevronForward } from 'ionicons/icons';

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

  const [type, setType] = useState(typeParam ?? 'reading');

  const footer = useMemo(
    () => (
      <div className="[direction:ltr] flex justify-between">
        <IonButton
          routerLink={`/quran/${parseInt(chapterNo) - 1}`}
          size="small"
          color="light"
          disabled={parseInt(chapterNo) === 1}
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
          routerLink={`/quran/${parseInt(chapterNo) + 1}`}
          disabled={parseInt(chapterNo) === 114}
        >
          Next Chapter
          <IonIcon slot="end" size="small" icon={chevronForward} />
        </IonButton>
      </div>
    ),
    [chapterNo]
  );

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
          <TranslationContent footer={footer} />
        ) : (
          <>
            {/* only render if the start pages data is availiable, because this required in child component to fetch data */}
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
        )}
      </IonContent>
    </IonPage>
  );
};

export default ViewChapter;
