import { ChapetersList, ChapterSortBy } from 'features/list-chapters';
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

  const scrollToTop = useCallback(() => {
    // Passing a duration to the method makes it so the scroll slowly
    // goes to the top instead of instantly
    contentRef.current?.scrollToTop(500);
    console.log(contentRef.current);
  }, [contentRef]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Quran</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent ref={contentRef} fullscreen>
        <IonSearchbar className="sticky top-0 z-30" color="light" />

        <IonSegment
          className="max-w-[94%] mx-auto"
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

        <ChapetersList sortBy={sortBy} />
      </IonContent>

      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton size="small" onClick={scrollToTop}>
          <IonIcon icon={arrowUp}></IonIcon>
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default Quran;
