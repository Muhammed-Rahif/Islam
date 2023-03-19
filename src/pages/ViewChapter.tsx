import { ChaptersList, ChapterSortBy } from 'features/list-chapters';
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
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { arrowUp } from 'ionicons/icons';
import { createRef, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useChapter } from 'features/view-chapter/api/useChapter';
import { useVersesUthmani } from 'features/view-chapter/api/useVersesUthmani';
import { numToArabic } from 'utils/string';

const ViewChapter: React.FC = () => {
  const contentRef = createRef<HTMLIonContentElement>();
  const [sortBy, setSortBy] = useState('reading');
  const [isScrolled, setIsScrolled] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { isLoading: isVersesLoading, data: versesData } = useVersesUthmani({
    chapterId: parseInt(id),
  });
  const { isLoading: isChapterLoading, data: chapterData } = useChapter({
    chapterId: parseInt(id),
  });

  console.log(chapterData);

  const scrollToTop = useCallback(() => {
    contentRef.current?.scrollToTop(500);
  }, [contentRef]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
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
      >
        <IonSegment
          className="mb-3"
          value={sortBy}
          onIonChange={(e) => setSortBy(e.detail.value!)}
        >
          <IonSegmentButton value="translation">
            <IonLabel>Translation</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="reading">
            <IonLabel>Reading</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        <div className="[direction:rtl] leading-9 text-justify">
          <IonText lang="ar" className="ml-2">
            <span className="mb-2 text-justify">
              {versesData?.verses.map((verse, indx) => (
                <>
                  {verse?.text_uthmani} {`  ﴿${numToArabic(++indx)}﴾  `}
                </>
              ))}
            </span>
          </IonText>
        </div>
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
