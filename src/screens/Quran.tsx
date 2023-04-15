import {
  ChaptersList,
  ChapterSortBy,
  useAllJuzs,
  useChapersList,
} from 'features/list-chapters';
import {
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonToast,
} from '@ionic/react';
import { createRef, useState } from 'react';
import DisplayError from 'components/DisplayError';
import { alertCircle } from 'ionicons/icons';

const Quran: React.FC = () => {
  const contentRef = createRef<HTMLIonContentElement>();
  const [sortBy, setSortBy] = useState<ChapterSortBy>('surah');
  const [search, setSearch] = useState('');
  const [presentToast] = useIonToast();

  const {
    isLoading,
    error,
    data: chaptersData,
    refetch: refetchChapters,
  } = useChapersList();
  const { data: allJuzsData, refetch: refetchAllJuzs } = useAllJuzs();

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Quran</IonTitle>
        </IonToolbar>

        <IonToolbar>
          <IonSearchbar
            onIonInput={(e) => setSearch(e.detail.value!)}
            className="sticky top-0 z-30 !pb-0"
          />
        </IonToolbar>

        <IonToolbar>
          <IonSegment
            className="w-full max-w-[calc(100%-1.5rem)] mx-auto mb-1.5"
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
        </IonToolbar>
      </IonHeader>
      <IonContent ref={contentRef} fullscreen scrollY={false}>
        {isLoading && (
          <div className="w-full h-3/4 grid place-items-center">
            <IonSpinner />
          </div>
        )}

        {Boolean(error) && (
          <DisplayError
            className="h-full"
            error={error}
            toastOnly={Boolean(chaptersData?.chapters.length)}
            onRetry={refetchChapters}
          />
        )}

        {chaptersData?.chapters && (
          <ChaptersList
            chapters={chaptersData?.chapters ?? []}
            juzs={allJuzsData?.juzs ?? []}
            search={search}
            sortBy={sortBy}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Quran;
