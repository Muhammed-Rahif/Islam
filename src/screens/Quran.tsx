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
      <IonHeader>
        <IonToolbar>
          <IonTitle>Quran</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent ref={contentRef} fullscreen scrollY={false}>
        <IonRefresher
          slot="fixed"
          onIonRefresh={async (e) => {
            Promise.all([await refetchChapters(), await refetchAllJuzs()])
              .catch((err) =>
                presentToast({
                  message: err.message,
                  duration: 4500,
                  position: 'bottom',
                  icon: alertCircle,
                })
              )
              .finally(e.detail.complete);
          }}
        >
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

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

        {isLoading && (
          <div className="w-full h-3/4 grid place-items-center">
            <IonSpinner />
          </div>
        )}

        {Boolean(error) && (
          <DisplayError
            error={error}
            toastOnly={Boolean(chaptersData?.chapters.length)}
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
