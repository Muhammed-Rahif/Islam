import { ChaptersList, ChapterSortBy } from 'features/list-chapters';
import {
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { createRef, useState } from 'react';

const Quran: React.FC = () => {
  const contentRef = createRef<HTMLIonContentElement>();
  const [sortBy, setSortBy] = useState<ChapterSortBy>('surah');
  const [search, setSearch] = useState('');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Quran</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent ref={contentRef} fullscreen scrollY={false}>
        <IonSearchbar
          onIonInput={(e) => setSearch(e.detail.value!)}
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
    </IonPage>
  );
};

export default Quran;
