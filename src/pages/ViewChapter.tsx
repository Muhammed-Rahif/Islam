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
import { numToArabic, removeHtmlTags } from 'utils/string';
import { useChapterVerses } from 'features/view-chapter';

const ViewChapter: React.FC = () => {
  const contentRef = createRef<HTMLIonContentElement>();
  const [type, setType] = useState('reading');
  const [isScrolled, setIsScrolled] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { isLoading: isVersesUthmaniLoading, data: versesUthmaniData } =
    useVersesUthmani({
      chapterId: parseInt(id),
    });
  const { isLoading: isChapterLoading, data: chapterData } = useChapter({
    chapterId: parseInt(id),
  });
  const { isLoading: isChapterVersesLoading, data: chapterVerses } =
    useChapterVerses({
      chapterId: parseInt(id),
      words: false,
    });

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
          <div className="[direction:rtl] leading-9 text-justify">
            <IonText lang="ar" className="ml-2">
              <span className="mb-2 text-justify">
                {versesUthmaniData?.verses.map((verse, indx) => (
                  <>
                    {verse?.text_uthmani} {`  ﴿${numToArabic(++indx)}﴾  `}
                  </>
                ))}
              </span>
            </IonText>
          </div>
        ) : (
          <div className="my-4">
            {chapterVerses?.verses.map((verse, indx) => (
              <>
                <div key={indx} className="[direction:rtl]">
                  <IonText lang="ar" className="ml-2">
                    <span className="mb-2 text-justify">
                      {versesUthmaniData?.verses[indx].text_uthmani}{' '}
                      {`  ﴿${numToArabic(++indx)}﴾  `}
                    </span>
                  </IonText>
                </div>
                <IonText className="text-left">
                  {removeHtmlTags(verse?.translations[0].text)} -{' '}
                  <small className="opacity-20 block mb-4">
                    {verse.translations[0].resource_name}
                  </small>
                </IonText>
              </>
            ))}
          </div>
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
