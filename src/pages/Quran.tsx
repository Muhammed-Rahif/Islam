import { ChaptersList, ChapterSortBy } from 'features/list-chapters';
import {
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
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { arrowUp } from 'ionicons/icons';
import { createRef, useCallback, useState } from 'react';

const Quran: React.FC = () => {
  const contentRef = createRef<HTMLIonContentElement>();
  const [sortBy, setSortBy] = useState<ChapterSortBy>('surah');
  const [search, setSearch] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToTop = useCallback(() => {
    contentRef.current?.scrollToTop(500);
  }, [contentRef]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Quran</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
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
        scrollY={false}
      >
        <IonSearchbar
          onIonChange={(e) => setSearch(e.detail.value!)}
          className="sticky top-0 z-30"
          color="light"
        />

        <IonSegment
          className="max-w-[calc(100%-1.5rem)] mx-auto"
          value={sortBy}
          onIonChange={(e) => setSortBy(e.detail.value as ChapterSortBy)}
        >
          <IonSegmentButton value="surah">
            <IonLabel>Surah</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="juz">
            <IonLabel>Juz</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="revelation-order">
            <IonLabel>Revelation Order</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        <ChaptersList search={search} sortBy={sortBy} />
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

export default Quran;
